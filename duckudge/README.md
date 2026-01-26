# Duckudge - The Passive-Aggressive Rubber Duck 🦆

A Chrome extension that injects a judgmental rubber duck into your web pages to provide passive-aggressive commentary on your coding habits.

## Features

### 🎯 Smart URL Detection
- **ChatGPT/OpenAI**: Catches you using AI to do your job
- **Twitter/X**: Calls out procrastination after 10 seconds
- **Localhost**: Judges your broken code and panic typing
- **StackOverflow**: Tracks desperate visits (3+ in 10 minutes)

### 🔇 Focus Mode
- **Quick Mute**: Click extension icon or use `Ctrl+Shift+D`
- **Temporary Mute**: "Mute for 1 hour" or "Mute for today"
- **Visual Feedback**: Duck fades to 30% opacity when muted
- **Syncs Across Devices**: Settings persist via Chrome sync

### 🎨 Customization
- **Custom Insults**: Add your own passive-aggressive messages
- **Sensitivity Levels**: Passive → Balanced → Aggressive
- **Export/Import**: Save and share your settings

### 🎮 Easter Eggs
- **Reddit Growth**: Duck grows 2x when you visit Reddit
- **Konami Code**: ↑↑↓↓←→←→BA for a special message
- **Late Night Warning**: Coding after 2 AM? Duck will judge you
- **Weekend Warrior**: Working on weekends? Touch grass!

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked**
5. Select the `duckudge` folder
6. The duck is now watching you! 👀

## Usage

### Basic Usage
1. Browse the web normally
2. Duck appears in bottom-right corner
3. Click duck for random insults
4. Duck speaks when you visit trigger URLs

### Muting the Duck
- **Popup**: Click extension icon → Toggle "Mute Duck"
- **Keyboard**: Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
- **Quick Mute**: Use "Mute for 1 hour" button in popup

### Adding Custom Insults
1. Click extension icon
2. Type your message in the input field
3. Click "Add"
4. Your insult joins the rotation!

## File Structure

```
duckudge/
├── manifest.json       # Extension configuration
├── config.js          # Centralized settings
├── content.js         # Main duck logic (injected into pages)
├── background.js      # Service worker for keyboard shortcuts
├── popup.html         # Settings UI
├── popup.css          # Settings UI styles
├── popup.js           # Settings UI logic
├── duck.png           # Duck image asset
├── TESTING.md         # Comprehensive testing guide
└── README.md          # This file
```

## Architecture

### Modular Design
- **DuckUI Class**: Manages visual duck and speech bubble
- **JudgmentEngine Class**: URL pattern matching and judgment logic
- **VisitTracker Class**: Chrome storage operations with debouncing
- **EventManager**: Keyboard/click event handling

### Performance Optimizations
- Debounced storage writes (max 1 write/second)
- Throttled keyboard events (sampled every 100ms)
- Mutation observer for SPA navigation
- Lazy-loaded popup UI

### Security
- Input sanitization to prevent XSS
- No external API calls (fully offline)
- Minimal permissions (only `storage` and `<all_urls>`)

## Configuration

Edit `config.js` to customize:

```javascript
TIMINGS: {
  CHATGPT_DELAY: 3000,    // Delay before ChatGPT message
  TWITTER_DELAY: 10000,   // Delay before Twitter message
  // ... more timings
}

INSULTS: {
  general: [...],         // General insults
  chatgpt: [...],         // ChatGPT-specific
  // ... more categories
}
```

## Testing

See [TESTING.md](TESTING.md) for comprehensive testing guide with 23 test cases.

Quick test:
1. Visit `https://chatgpt.com` → Wait 3 seconds
2. Visit `http://localhost:3000` → Type rapidly
3. Visit `https://stackoverflow.com` → Refresh 3 times

## Troubleshooting

### Duck not appearing?
- Check if extension is enabled
- Verify duck is not muted (check badge color)
- Refresh the page

### Keyboard shortcut not working?
- Check `chrome://extensions/shortcuts`
- Ensure no conflicts with other extensions

### Storage issues?
- Reset visit tracking in popup settings
- Clear extension storage and reload

## Browser Compatibility

- ✅ Chrome 88+ (Manifest V3)
- ✅ Edge 88+
- ✅ Brave
- ❌ Firefox (requires Manifest V2 port)

## Privacy

- **No data collection**: Everything stays local
- **No external requests**: Fully offline
- **No tracking**: Your coding shame is safe with us
- **Sync optional**: Settings sync via Chrome's built-in sync

## Contributing

Ideas for improvements:
- [ ] More URL patterns (GitHub, Reddit, LinkedIn)
- [ ] Sound effects (optional quack sounds)
- [ ] Themes (pirate duck, ninja duck, wizard duck)
- [ ] Analytics dashboard (track most-visited sites)
- [ ] AI-generated insults (local LLM integration)

## License

MIT License - Use freely, modify freely, judge freely.

## Credits

- Duck icon from [Flaticon](https://www.flaticon.com/free-icons/duck)
- Built with ❤️ and 😤
- Inspired by every developer who's ever felt judged by their rubber duck

---

**Remember**: The duck is here to help... in its own passive-aggressive way. 🦆

*"I've seen cleaner code in a spaghetti factory."* - The Duck
