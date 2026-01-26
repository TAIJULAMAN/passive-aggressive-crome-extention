/**
 * Background Service Worker for Duckudge
 * Handles keyboard shortcuts and badge updates
 */

// Listen for keyboard command
chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-mute') {
        toggleMute();
    }
});

// Toggle mute function
async function toggleMute() {
    try {
        const result = await chrome.storage.sync.get(['isMuted']);
        const newMuteState = !result.isMuted;

        await chrome.storage.sync.set({
            isMuted: newMuteState,
            muteUntil: null // Clear temporary mute
        });

        // Update badge
        updateBadge(newMuteState);

        // Notify all tabs
        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
                action: 'toggleMute',
                isMuted: newMuteState
            }).catch(() => {
                // Ignore errors for tabs without content script
            });
        });
    } catch (error) {
        console.error('Error toggling mute:', error);
    }
}

// Update extension badge
async function updateBadge(isMuted) {
    if (chrome.action && chrome.action.setBadgeText) {
        await chrome.action.setBadgeText({ text: isMuted ? '' : '●' });
        await chrome.action.setBadgeBackgroundColor({
            color: isMuted ? '#9ca3af' : '#ef4444'
        });
    }
}

// Initialize badge on install
chrome.runtime.onInstalled.addListener(async () => {
    const result = await chrome.storage.sync.get(['isMuted']);
    updateBadge(result.isMuted || false);
});

// Update badge on startup
chrome.runtime.onStartup.addListener(async () => {
    const result = await chrome.storage.sync.get(['isMuted', 'muteUntil']);

    // Check if temporary mute has expired
    if (result.muteUntil && Date.now() > result.muteUntil) {
        await chrome.storage.sync.set({ isMuted: false, muteUntil: null });
        updateBadge(false);
    } else {
        updateBadge(result.isMuted || false);
    }
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.isMuted) {
        updateBadge(changes.isMuted.newValue);
    }
});
