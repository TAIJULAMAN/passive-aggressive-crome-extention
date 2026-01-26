/**
 * Duckudge Content Script
 * Injects a passive-aggressive rubber duck into web pages
 */

// ============================================================================
// DuckUI Class - Manages the visual duck and speech bubble
// ============================================================================
class DuckUI {
    constructor() {
        this.container = null;
        this.bubble = null;
        this.duckImg = null;
        this.isMuted = false;
        this.isRedditMode = false;
        this.init();
    }

    /**
     * Initialize the duck UI and inject into DOM
     */
    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.id = 'judgmental-duck';
        this.container.setAttribute('role', 'complementary');
        this.container.setAttribute('aria-label', 'Passive-aggressive duck assistant');

        this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      z-index: 2147483647;
      cursor: pointer;
      transition: transform 0.3s ease, opacity 0.3s ease;
      pointer-events: auto;
      opacity: 1;
    `;

        // Create duck image
        this.duckImg = document.createElement('img');
        this.duckImg.src = chrome.runtime.getURL('duck.png');
        this.duckImg.alt = 'Judgmental rubber duck';
        this.duckImg.style.cssText = `
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
    `;

        // Create speech bubble
        this.bubble = document.createElement('div');
        this.bubble.setAttribute('role', 'status');
        this.bubble.setAttribute('aria-live', 'polite');
        this.bubble.style.cssText = `
      position: absolute;
      bottom: 110px;
      right: 0;
      background: white;
      color: #333;
      padding: 15px;
      border-radius: 15px;
      width: 220px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      display: none;
      border: 2px solid #333;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

        // Speech bubble content
        this.bubble.innerHTML = `
      <span id="duck-text" style="display: block; word-wrap: break-word;"></span>
      <div style="position: absolute; bottom: -10px; right: 40px; width: 0; height: 0; 
                  border-left: 10px solid transparent; border-right: 10px solid transparent; 
                  border-top: 10px solid #333;"></div>
    `;

        // Assemble
        this.container.appendChild(this.bubble);
        this.container.appendChild(this.duckImg);

        // Inject into page
        if (document.body) {
            document.body.appendChild(this.container);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(this.container);
            });
        }

        // Check mute status
        this.checkMuteStatus();
    }

    /**
     * Check if duck is muted and update UI
     */
    async checkMuteStatus() {
        try {
            const result = await chrome.storage.sync.get(['isMuted', 'muteUntil']);

            // Check if temporary mute has expired
            if (result.muteUntil && Date.now() > result.muteUntil) {
                await chrome.storage.sync.set({ isMuted: false, muteUntil: null });
                this.isMuted = false;
            } else {
                this.isMuted = result.isMuted || false;
            }

            this.updateMuteUI();
        } catch (error) {
            console.error('Duckudge: Error checking mute status', error);
        }
    }

    /**
     * Update UI based on mute status
     */
    updateMuteUI() {
        if (this.isMuted) {
            this.container.style.opacity = '0.3';
            this.container.style.pointerEvents = 'none';
        } else {
            this.container.style.opacity = '1';
            this.container.style.pointerEvents = 'auto';
        }
    }

    /**
     * Make the duck speak
     * @param {string} text - Message to display
     */
    speak(text) {
        if (this.isMuted) return;

        const textSpan = document.getElementById('duck-text');
        if (!textSpan) return;

        textSpan.textContent = text;
        this.bubble.style.display = 'block';

        // Fade in
        setTimeout(() => {
            this.bubble.style.opacity = '1';
        }, 10);

        // Shake animation
        this.shake();

        // Auto-hide after duration
        setTimeout(() => {
            this.bubble.style.opacity = '0';
            setTimeout(() => {
                this.bubble.style.display = 'none';
            }, DUCKUDGE_CONFIG.ANIMATIONS.FADE_DURATION);
        }, DUCKUDGE_CONFIG.TIMINGS.BUBBLE_DURATION);
    }

    /**
     * Shake the duck for emphasis
     */
    shake() {
        this.duckImg.style.transform = 'rotate(-10deg)';
        setTimeout(() => {
            this.duckImg.style.transform = 'rotate(0deg)';
        }, DUCKUDGE_CONFIG.ANIMATIONS.SHAKE_DURATION);
    }

    /**
     * Grow the duck (Easter egg)
     */
    grow() {
        if (this.isRedditMode) return;
        this.isRedditMode = true;
        this.container.style.transform = `scale(${DUCKUDGE_CONFIG.ANIMATIONS.GROWTH_SCALE})`;
        this.speak(DUCKUDGE_CONFIG.EASTER_EGGS.reddit);
    }

    /**
     * Get random insult from category
     * @param {string} category - Insult category
     * @returns {string}
     */
    getRandomInsult(category = 'general') {
        const insults = DUCKUDGE_CONFIG.INSULTS[category] || DUCKUDGE_CONFIG.INSULTS.general;
        return insults[Math.floor(Math.random() * insults.length)];
    }

    /**
     * Handle click on duck
     */
    onClick(callback) {
        this.container.addEventListener('click', callback);
    }
}

// ============================================================================
// VisitTracker Class - Manages visit tracking with chrome.storage
// ============================================================================
class VisitTracker {
    constructor() {
        this.debounceTimer = null;
    }

    /**
     * Track a visit to a site
     * @param {string} site - Site identifier
     * @returns {Promise<number>} - Number of recent visits
     */
    async trackVisit(site) {
        try {
            const storageKey = `${site}_visits`;
            const result = await chrome.storage.local.get([storageKey]);
            let visits = result[storageKey] || [];
            const now = Date.now();

            // Filter visits within the time window
            visits = visits.filter(timestamp =>
                now - timestamp < DUCKUDGE_CONFIG.TIMINGS.STACKOVERFLOW_WINDOW
            );

            // Add current visit
            visits.push(now);

            // Debounced save
            this.debouncedSave(storageKey, visits);

            return visits.length;
        } catch (error) {
            console.error('Duckudge: Error tracking visit', error);
            return 0;
        }
    }

    /**
     * Debounced storage save to prevent excessive writes
     * @param {string} key - Storage key
     * @param {any} value - Value to save
     */
    debouncedSave(key, value) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            chrome.storage.local.set({ [key]: value });
        }, DUCKUDGE_CONFIG.TIMINGS.STORAGE_DEBOUNCE);
    }

    /**
     * Reset visit tracking for a site
     * @param {string} site - Site identifier
     */
    async resetVisits(site) {
        const storageKey = `${site}_visits`;
        await chrome.storage.local.remove([storageKey]);
    }
}

// ============================================================================
// JudgmentEngine Class - Determines what the duck should say
// ============================================================================
class JudgmentEngine {
    constructor(duckUI, visitTracker) {
        this.duckUI = duckUI;
        this.visitTracker = visitTracker;
        this.url = window.location.href;
        this.keyCount = 0;
        this.konamiCode = [];
        this.konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    }

    /**
     * Check URL and trigger appropriate judgment
     */
    async judge() {
        // ChatGPT check
        if (this.matchesPattern('chatgpt')) {
            setTimeout(() => {
                this.duckUI.speak(this.duckUI.getRandomInsult('chatgpt'));
            }, DUCKUDGE_CONFIG.TIMINGS.CHATGPT_DELAY);
        }

        // Twitter/X check
        if (this.matchesPattern('twitter')) {
            setTimeout(() => {
                this.duckUI.speak(this.duckUI.getRandomInsult('twitter'));
            }, DUCKUDGE_CONFIG.TIMINGS.TWITTER_DELAY);
        }

        // Localhost check
        if (this.matchesPattern('localhost')) {
            this.duckUI.speak(this.duckUI.getRandomInsult('localhost'));
            this.setupTypingDetection();
        }

        // StackOverflow check
        if (this.matchesPattern('stackoverflow')) {
            const visitCount = await this.visitTracker.trackVisit('stackoverflow');

            if (visitCount >= DUCKUDGE_CONFIG.THRESHOLDS.SO_VISIT_COUNT) {
                this.duckUI.speak(DUCKUDGE_CONFIG.INSULTS.stackoverflow[0]); // "Wow, back again?"
            } else {
                this.duckUI.speak(this.duckUI.getRandomInsult('stackoverflow'));
            }
        }

        // Reddit Easter egg
        if (this.matchesPattern('reddit')) {
            setTimeout(() => {
                this.duckUI.grow();
            }, 1000);
        }

        // Time-based Easter eggs
        this.checkTimeBasedEasterEggs();
    }

    /**
     * Check if URL matches a pattern
     * @param {string} patternKey - Key in URL_PATTERNS config
     * @returns {boolean}
     */
    matchesPattern(patternKey) {
        const patterns = DUCKUDGE_CONFIG.URL_PATTERNS[patternKey];
        if (!patterns) return false;
        return patterns.some(pattern => this.url.includes(pattern));
    }

    /**
     * Setup rapid typing detection
     */
    setupTypingDetection() {
        let lastCheck = Date.now();

        const throttledHandler = (e) => {
            const now = Date.now();
            if (now - lastCheck < DUCKUDGE_CONFIG.TIMINGS.KEYBOARD_THROTTLE) return;
            lastCheck = now;

            this.keyCount++;

            // Check for rapid typing
            if (this.keyCount > DUCKUDGE_CONFIG.THRESHOLDS.RAPID_TYPING) {
                this.duckUI.speak(this.duckUI.getRandomInsult('typing'));
                this.keyCount = 0;
            }

            // Konami code detection
            this.konamiCode.push(e.key);
            if (this.konamiCode.length > this.konamiSequence.length) {
                this.konamiCode.shift();
            }
            if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
                this.duckUI.speak(DUCKUDGE_CONFIG.EASTER_EGGS.konami);
                this.konamiCode = [];
            }
        };

        document.addEventListener('keydown', throttledHandler);

        // Reset key count periodically
        setInterval(() => {
            this.keyCount = 0;
        }, DUCKUDGE_CONFIG.TIMINGS.TYPING_RESET_INTERVAL);
    }

    /**
     * Check for time-based Easter eggs
     */
    checkTimeBasedEasterEggs() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();

        // Late night coding (2 AM - 5 AM)
        if (hour >= 2 && hour < 5) {
            setTimeout(() => {
                this.duckUI.speak(DUCKUDGE_CONFIG.EASTER_EGGS.lateNight);
            }, 5000);
        }

        // Weekend coding (Saturday = 6, Sunday = 0)
        if (day === 0 || day === 6) {
            setTimeout(() => {
                this.duckUI.speak(DUCKUDGE_CONFIG.EASTER_EGGS.weekend);
            }, 7000);
        }
    }
}

// ============================================================================
// Main Initialization
// ============================================================================
(function initDuckudge() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Initialize components
        const duckUI = new DuckUI();
        const visitTracker = new VisitTracker();
        const judgmentEngine = new JudgmentEngine(duckUI, visitTracker);

        // Start judging
        judgmentEngine.judge();

        // Handle duck clicks
        duckUI.onClick(() => {
            if (!duckUI.isMuted) {
                duckUI.speak(duckUI.getRandomInsult('general'));
            }
        });

        // Listen for mute status changes from popup
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'sync' && changes.isMuted) {
                duckUI.isMuted = changes.isMuted.newValue;
                duckUI.updateMuteUI();
            }
        });

        // Listen for keyboard shortcut
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'toggleMute') {
                duckUI.isMuted = !duckUI.isMuted;
                duckUI.updateMuteUI();
                chrome.storage.sync.set({ isMuted: duckUI.isMuted });
            }
        });
    }
})();
