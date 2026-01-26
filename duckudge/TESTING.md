# Duckudge - Testing Guide

## Installation Instructions

### 1. Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `duckudge` folder
5. The duck icon should appear in your extensions toolbar

### 2. Verify Installation

- Extension icon should be visible
- Badge should show a red dot (●) indicating active status
- Click the icon to open the settings popup

---

## Testing Checklist

### ✅ Core Functionality Tests

#### Test 1: ChatGPT Detection
- **URL**: Visit `https://chatgpt.com` or `https://openai.com`
- **Expected**: After 3 seconds, duck appears with message like "Oh great. Letting the robot do your job again?"
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 2: Twitter/X Procrastination Warning
- **URL**: Visit `https://twitter.com` or `https://x.com`
- **Expected**: After 10 seconds, duck says "Your deadline isn't moving, but sure, keep scrolling..."
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 3: Localhost Broken Code
- **URL**: Visit `http://localhost:3000` (or any localhost URL)
- **Expected**: 
  - Immediate message: "It's still broken, isn't it?"
  - Type rapidly (50+ keystrokes in 5 seconds)
  - Second message: "Typing harder won't fix the logic, Dave."
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 4: StackOverflow Visit Tracking
- **URL**: Visit `https://stackoverflow.com`
- **Expected**:
  - First visit: "Copy-paste time! Hope you find a solution that isn't 8 years old."
  - Refresh 3 times within 10 minutes
  - Third visit: "Wow, back again? Have you tried actually READING the documentation?"
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 5: Click for Random Insult
- **Action**: Click on the duck
- **Expected**: Random insult from general collection
- **Status**: ⬜ Pass / ⬜ Fail

---

### ✅ Mute Functionality Tests

#### Test 6: Mute Toggle (Popup)
- **Action**: Click extension icon → Toggle "Mute Duck" switch
- **Expected**:
  - Duck becomes 30% transparent
  - Status badge changes to "Muted" (gray)
  - No speech bubbles appear when visiting trigger URLs
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 7: Keyboard Shortcut
- **Action**: Press `Ctrl+Shift+D` (Windows/Linux) or `Cmd+Shift+D` (Mac)
- **Expected**: Duck toggles between muted and active
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 8: Quick Mute (1 Hour)
- **Action**: Click "Mute for 1 hour" button
- **Expected**:
  - Duck mutes immediately
  - After 1 hour, automatically unmutes
  - (For testing, you can modify the duration in config.js)
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 9: Mute Persistence
- **Action**: Mute duck → Close browser → Reopen browser
- **Expected**: Duck remains muted across sessions
- **Status**: ⬜ Pass / ⬜ Fail

---

### ✅ Settings & Customization Tests

#### Test 10: Add Custom Insult
- **Action**: 
  1. Open popup
  2. Type custom message in input field
  3. Click "Add"
- **Expected**: 
  - Insult appears in list below
  - Click duck → custom insult may appear in rotation
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 11: Delete Custom Insult
- **Action**: Click "Delete" button on a custom insult
- **Expected**: Insult removed from list
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 12: Sensitivity Slider
- **Action**: Move slider between Passive → Balanced → Aggressive
- **Expected**: Label updates accordingly (functionality can be extended later)
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 13: Reset Visit Tracking
- **Action**: Click "Reset Visit Tracking" button
- **Expected**: StackOverflow visit counter resets to 0
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 14: Export Settings
- **Action**: Click "Export Settings" button
- **Expected**: Downloads `duckudge-settings.json` file
- **Status**: ⬜ Pass / ⬜ Fail

---

### ✅ Easter Eggs Tests

#### Test 15: Reddit Growth
- **URL**: Visit `https://reddit.com`
- **Expected**: Duck grows 2x in size and says "Reddit? Really? Your code can wait, I guess."
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 16: Konami Code
- **Action**: Type arrow keys: ↑ ↑ ↓ ↓ ← → ← → B A
- **Expected**: Duck says "🎮 You're a legend! Now get back to coding."
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 17: Late Night Coding
- **Time**: Visit any site between 2 AM - 5 AM
- **Expected**: Duck says "It's 2 AM. Go to bed. Seriously."
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 18: Weekend Coding
- **Time**: Visit any site on Saturday or Sunday
- **Expected**: Duck says "It's the weekend. Touch grass."
- **Status**: ⬜ Pass / ⬜ Fail

---

### ✅ Performance & Compatibility Tests

#### Test 19: CPU Usage
- **Action**: Monitor Chrome Task Manager while typing rapidly
- **Expected**: Extension CPU usage < 5%
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 20: Memory Usage
- **Action**: Check extension memory footprint
- **Expected**: < 10MB per tab
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 21: SPA Navigation
- **Action**: Navigate within a single-page app (e.g., React app on localhost)
- **Expected**: Duck persists and continues to function
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 22: Z-Index Conflicts
- **Action**: Visit sites with modals/overlays (e.g., YouTube, Gmail)
- **Expected**: Duck remains visible and clickable
- **Status**: ⬜ Pass / ⬜ Fail

#### Test 23: Browser Zoom
- **Action**: Test at 50%, 100%, 200% zoom levels
- **Expected**: Duck scales appropriately and remains functional
- **Status**: ⬜ Pass / ⬜ Fail

---

## Troubleshooting

### Duck Not Appearing
1. Check if extension is enabled in `chrome://extensions`
2. Verify content script is injected (check DevTools → Console for errors)
3. Try refreshing the page
4. Check if duck is muted

### Speech Bubble Not Showing
1. Verify duck is not muted
2. Check browser console for JavaScript errors
3. Ensure URL matches one of the trigger patterns

### Keyboard Shortcut Not Working
1. Check if shortcut conflicts with other extensions
2. Go to `chrome://extensions/shortcuts` to verify/change shortcut
3. Ensure page has focus (not DevTools)

### Storage Issues
1. Clear extension storage: `chrome.storage.sync.clear()`
2. Reload extension
3. Check storage quota (sync storage has 100KB limit)

---

## Advanced Testing

### Testing with Modified Timings
For faster testing, you can modify `config.js`:

```javascript
TIMINGS: {
  CHATGPT_DELAY: 1000,        // Reduce to 1 second
  TWITTER_DELAY: 2000,        // Reduce to 2 seconds
  BUBBLE_DURATION: 3000,      // Reduce to 3 seconds
}
```

### Console Debugging
Open DevTools Console and check for:
- `Duckudge:` prefixed log messages
- Storage operations
- Error messages

### Inspect Storage
```javascript
// In console
chrome.storage.sync.get(null, (data) => console.log('Sync:', data));
chrome.storage.local.get(null, (data) => console.log('Local:', data));
```

---

## Known Limitations

1. **Manifest V3 Restrictions**: Some timing features may be affected by Chrome's service worker lifecycle
2. **Storage Limits**: Chrome sync storage limited to 100KB
3. **Content Script Injection**: May not work on `chrome://` pages or Chrome Web Store
4. **Cross-Origin**: Duck image must be web-accessible resource

---

## Reporting Issues

If you encounter bugs:
1. Note the URL where the issue occurred
2. Check browser console for errors
3. Export settings for debugging
4. Note Chrome version and OS

---

## Success Criteria

Extension is ready for use when:
- ✅ All 23 tests pass
- ✅ No console errors on common sites
- ✅ Mute functionality works reliably
- ✅ Settings persist across sessions
- ✅ Performance impact is minimal

**Happy Testing! 🦆**
