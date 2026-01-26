/**
 * Duckudge Popup Script
 * Manages settings UI and chrome.storage interactions
 */

// DOM Elements
const muteToggle = document.getElementById('muteToggle');
const muteLabel = document.getElementById('muteLabel');
const statusBadge = document.getElementById('statusBadge');
const customInsultInput = document.getElementById('customInsultInput');
const addInsultBtn = document.getElementById('addInsultBtn');
const customInsultsList = document.getElementById('customInsultsList');
const sensitivitySlider = document.getElementById('sensitivitySlider');
const sensitivityValue = document.getElementById('sensitivityValue');
const resetVisitsBtn = document.getElementById('resetVisitsBtn');
const exportSettingsBtn = document.getElementById('exportSettingsBtn');
const quickMuteBtns = document.querySelectorAll('.quick-btn');

// Initialize popup
async function init() {
    await loadSettings();
    setupEventListeners();
    updateBadge();
}

// Load settings from chrome.storage
async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get([
            'isMuted',
            'muteUntil',
            'customInsults',
            'sensitivity'
        ]);

        // Check if temporary mute has expired
        if (result.muteUntil && Date.now() > result.muteUntil) {
            await chrome.storage.sync.set({ isMuted: false, muteUntil: null });
            muteToggle.checked = false;
        } else {
            muteToggle.checked = result.isMuted || false;
        }

        // Load custom insults
        const customInsults = result.customInsults || [];
        renderCustomInsults(customInsults);

        // Load sensitivity
        const sensitivity = result.sensitivity || 2;
        sensitivitySlider.value = sensitivity;
        updateSensitivityLabel(sensitivity);

        // Update UI
        updateMuteUI(muteToggle.checked);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mute toggle
    muteToggle.addEventListener('change', handleMuteToggle);

    // Quick mute buttons
    quickMuteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const duration = parseInt(btn.dataset.duration);
            handleQuickMute(duration);
        });
    });

    // Custom insults
    addInsultBtn.addEventListener('click', addCustomInsult);
    customInsultInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomInsult();
    });

    // Sensitivity slider
    sensitivitySlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        updateSensitivityLabel(value);
        chrome.storage.sync.set({ sensitivity: value });
    });

    // Reset visits
    resetVisitsBtn.addEventListener('click', resetVisits);

    // Export settings
    exportSettingsBtn.addEventListener('click', exportSettings);

    // Listen for keyboard shortcut
    chrome.commands.onCommand.addListener((command) => {
        if (command === 'toggle-mute') {
            muteToggle.checked = !muteToggle.checked;
            handleMuteToggle();
        }
    });
}

// Handle mute toggle
async function handleMuteToggle() {
    const isMuted = muteToggle.checked;

    await chrome.storage.sync.set({
        isMuted: isMuted,
        muteUntil: null // Clear temporary mute
    });

    updateMuteUI(isMuted);
    updateBadge();

    // Notify all tabs
    broadcastMuteStatus(isMuted);
}

// Handle quick mute
async function handleQuickMute(duration) {
    const muteUntil = Date.now() + duration;

    await chrome.storage.sync.set({
        isMuted: true,
        muteUntil: muteUntil
    });

    muteToggle.checked = true;
    updateMuteUI(true);
    updateBadge();

    // Notify all tabs
    broadcastMuteStatus(true);

    // Show feedback
    showToast(`Muted for ${duration / 3600000} hour(s)`);
}

// Update mute UI
function updateMuteUI(isMuted) {
    if (isMuted) {
        muteLabel.textContent = 'Duck is Muted';
        statusBadge.textContent = 'Muted';
        statusBadge.classList.remove('active');
        statusBadge.classList.add('muted');
    } else {
        muteLabel.textContent = 'Duck is Active';
        statusBadge.textContent = 'Active';
        statusBadge.classList.remove('muted');
        statusBadge.classList.add('active');
    }
}

// Update extension badge
async function updateBadge() {
    const result = await chrome.storage.sync.get(['isMuted']);
    const isMuted = result.isMuted || false;

    if (chrome.action && chrome.action.setBadgeText) {
        await chrome.action.setBadgeText({ text: isMuted ? '' : '●' });
        await chrome.action.setBadgeBackgroundColor({
            color: isMuted ? '#9ca3af' : '#ef4444'
        });
    }
}

// Broadcast mute status to all tabs
async function broadcastMuteStatus(isMuted) {
    const tabs = await chrome.tabs.query({});
    tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
            action: 'toggleMute',
            isMuted: isMuted
        }).catch(() => {
            // Ignore errors for tabs that don't have content script
        });
    });
}

// Add custom insult
async function addCustomInsult() {
    const insult = customInsultInput.value.trim();

    if (!insult) {
        showToast('Please enter an insult!', 'error');
        return;
    }

    if (insult.length > 150) {
        showToast('Insult too long! Max 150 characters.', 'error');
        return;
    }

    try {
        const result = await chrome.storage.sync.get(['customInsults']);
        const customInsults = result.customInsults || [];

        customInsults.push(insult);
        await chrome.storage.sync.set({ customInsults });

        renderCustomInsults(customInsults);
        customInsultInput.value = '';
        showToast('Insult added!', 'success');
    } catch (error) {
        console.error('Error adding insult:', error);
        showToast('Error adding insult!', 'error');
    }
}

// Render custom insults
function renderCustomInsults(insults) {
    customInsultsList.innerHTML = '';

    if (insults.length === 0) {
        customInsultsList.innerHTML = '<p style="color: #999; font-size: 12px; text-align: center; padding: 20px;">No custom insults yet. Add one above!</p>';
        return;
    }

    insults.forEach((insult, index) => {
        const item = document.createElement('div');
        item.className = 'insult-item';
        item.innerHTML = `
      <span class="insult-text">${escapeHtml(insult)}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

        item.querySelector('.delete-btn').addEventListener('click', () => {
            deleteCustomInsult(index);
        });

        customInsultsList.appendChild(item);
    });
}

// Delete custom insult
async function deleteCustomInsult(index) {
    try {
        const result = await chrome.storage.sync.get(['customInsults']);
        const customInsults = result.customInsults || [];

        customInsults.splice(index, 1);
        await chrome.storage.sync.set({ customInsults });

        renderCustomInsults(customInsults);
        showToast('Insult deleted!', 'success');
    } catch (error) {
        console.error('Error deleting insult:', error);
        showToast('Error deleting insult!', 'error');
    }
}

// Update sensitivity label
function updateSensitivityLabel(value) {
    const labels = ['Passive', 'Balanced', 'Aggressive'];
    sensitivityValue.textContent = labels[value - 1];
}

// Reset visit tracking
async function resetVisits() {
    if (!confirm('Reset all visit tracking data?')) return;

    try {
        await chrome.storage.local.clear();
        showToast('Visit tracking reset!', 'success');
    } catch (error) {
        console.error('Error resetting visits:', error);
        showToast('Error resetting data!', 'error');
    }
}

// Export settings
async function exportSettings() {
    try {
        const settings = await chrome.storage.sync.get(null);
        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'duckudge-settings.json';
        link.click();

        URL.revokeObjectURL(url);
        showToast('Settings exported!', 'success');
    } catch (error) {
        console.error('Error exporting settings:', error);
        showToast('Error exporting settings!', 'error');
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    // Simple alert for now - could be enhanced with custom toast UI
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${emoji} ${message}`);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
