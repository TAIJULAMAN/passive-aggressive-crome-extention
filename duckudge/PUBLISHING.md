# Publishing Duckudge to Chrome Web Store

## 📦 Pre-Publishing Checklist

Before submitting to the Chrome Web Store, ensure you have:

- ✅ **Extension Files**: All files in `duckudge` folder
- ✅ **Manifest V3**: Using latest manifest version
- ✅ **Icons**: duck.png (need 128x128 for store)
- ✅ **Screenshots**: Need 1-5 screenshots (1280x800 or 640x400)
- ✅ **Promotional Images**: Optional but recommended
- ✅ **Privacy Policy**: Required if using permissions
- ✅ **Description**: Store listing copy

---

## 🎨 Required Assets for Chrome Web Store

### 1. Extension Icon (Required)
- **Current**: `duck.png` (works for all sizes)
- **Required Sizes**: 128x128px (we have this)
- ✅ Already included in manifest

### 2. Screenshots (Required - at least 1)
You need to capture screenshots showing:
- Duck appearing on a webpage
- Settings popup with mute controls
- Duck speech bubble with a message

**Recommended screenshots:**
1. Duck on ChatGPT with message
2. Settings popup showing mute toggle
3. Custom insults management
4. Duck on localhost with typing message

### 3. Store Listing Information

#### **Name** (max 45 characters)
```
Passive-Aggressive Duck
```

#### **Summary** (max 132 characters)
```
A rubber duck that judges your coding habits. Mute it when you need to focus. ChatGPT, Twitter, localhost detection included!
```

#### **Description** (max 16,000 characters)
```
🦆 Meet Your New Coding Companion (Who Judges You)

Duckudge is a passive-aggressive rubber duck that appears on your web pages to provide "motivational" commentary on your coding habits. Think of it as a rubber duck debugging assistant... if that duck had opinions and wasn't afraid to share them.

✨ FEATURES

🎯 Smart URL Detection
• ChatGPT/OpenAI: Catches you using AI to do your job
• Twitter/X: Calls out procrastination after 10 seconds
• Localhost: Judges your broken code and panic typing
• StackOverflow: Tracks desperate visits (3+ in 10 minutes)

🔇 Focus Mode (Because Sometimes You Need Peace)
• Quick Mute: Click extension icon or press Ctrl+Shift+D
• Temporary Mute: "Mute for 1 hour" or "Mute for today" options
• Visual Feedback: Duck fades to 30% opacity when muted
• Syncs Across Devices: Your settings follow you everywhere

🎨 Full Customization
• Add unlimited custom passive-aggressive messages
• Delete unwanted insults
• Export/import your settings
• Sensitivity slider for future enhancements

🎮 Hidden Easter Eggs
• Reddit Growth: Duck grows 2x when you visit Reddit
• Konami Code: Try ↑↑↓↓←→←→BA for a surprise
• Late Night Warning: Coding after 2 AM? Duck will judge
• Weekend Warrior: Working on weekends? Touch grass!
• Rapid Typing Detection: Panic coding triggers special messages

💬 SAMPLE INSULTS

• "I've seen cleaner code in a spaghetti factory."
• "Oh great. Letting the robot do your job again?"
• "Your deadline isn't moving, but sure, keep scrolling."
• "It's still broken, isn't it? I can smell the syntax error from here."
• "Typing harder won't fix the logic, Dave."

🔒 PRIVACY FIRST

• No data collection or tracking
• Everything stays local on your device
• No external API calls
• Fully offline functionality
• Optional Chrome sync for settings only

⚡ PERFORMANCE

• Lightweight: <10MB memory per tab
• Optimized: Debounced storage, throttled events
• Non-intrusive: Fixed position, won't break layouts
• Fast: Minimal CPU usage (<5%)

🎯 PERFECT FOR

• Developers who need motivation (or demotivation)
• Anyone who spends too much time on ChatGPT
• Twitter procrastinators
• StackOverflow power users
• People who appreciate passive-aggressive humor

📝 HOW TO USE

1. Install the extension
2. Browse the web normally
3. Duck appears in bottom-right corner
4. Click duck for random insults
5. Press Ctrl+Shift+D to mute when you need to focus

🛠️ TECHNICAL DETAILS

• Manifest V3 compliant
• Modern ES6 architecture
• Modular class-based design
• Keyboard shortcuts supported
• Cross-device settings sync

💡 TIPS

• Customize insults to match your sense of humor
• Use quick mute for focused work sessions
• Try the Konami code for a special message
• Visit localhost and type rapidly for a surprise

⭐ SUPPORT

Found a bug? Have a feature request? Visit our GitHub:
https://github.com/TAIJULAMAN/passive-aggressive-crome-extention

---

Remember: The duck is here to help... in its own passive-aggressive way. 🦆

"Works on my machine... because I'm a picture." - The Duck
```

#### **Category**
```
Productivity (or Fun)
```

#### **Language**
```
English
```

---

## 🚀 Step-by-Step Publishing Guide

### Step 1: Create Developer Account
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay one-time $5 registration fee
4. Accept developer agreement

### Step 2: Prepare Extension Package
```bash
# Navigate to your project
cd c:\Projects\passive-aggressive-crome-extention

# Create a ZIP file of the duckudge folder
# (Exclude README.md and TESTING.md from the ZIP - they're for GitHub only)
```

**Files to include in ZIP:**
- manifest.json
- config.js
- content.js
- background.js
- popup.html
- popup.css
- popup.js
- duck.png

**Files to EXCLUDE from ZIP:**
- README.md (GitHub only)
- TESTING.md (GitHub only)
- .git folder
- node_modules (if any)

### Step 3: Create ZIP Package
```powershell
# In PowerShell, navigate to duckudge folder
cd c:\Projects\passive-aggressive-crome-extention\duckudge

# Create ZIP (excluding docs)
Compress-Archive -Path manifest.json,config.js,content.js,background.js,popup.html,popup.css,popup.js,duck.png -DestinationPath ..\duckudge-v1.0.0.zip
```

### Step 4: Upload to Chrome Web Store
1. Click **"New Item"** in Developer Dashboard
2. Upload `duckudge-v1.0.0.zip`
3. Fill in store listing:
   - **Product name**: Passive-Aggressive Duck
   - **Summary**: (use text above)
   - **Description**: (use text above)
   - **Category**: Productivity
   - **Language**: English

### Step 5: Add Screenshots
You need to manually capture these:
1. Load extension in Chrome
2. Visit chatgpt.com and screenshot the duck
3. Open popup and screenshot settings
4. Screenshot duck on localhost
5. Upload to store listing (1280x800 or 640x400)

### Step 6: Privacy & Permissions
1. **Single Purpose**: "Provides passive-aggressive coding motivation"
2. **Permission Justification**:
   - `storage`: "Store user settings and visit tracking"
   - `<all_urls>`: "Inject duck on all websites for URL detection"
3. **Privacy Policy**: (see below)

### Step 7: Submit for Review
1. Click **"Submit for Review"**
2. Review typically takes 1-3 business days
3. You'll receive email when approved/rejected

---

## 📄 Privacy Policy (Required)

You need to host a privacy policy. Here's the content:

```markdown
# Privacy Policy for Passive-Aggressive Duck

Last Updated: January 26, 2026

## Data Collection
Passive-Aggressive Duck does NOT collect, store, or transmit any personal data.

## Local Storage
The extension uses Chrome's local storage API to:
- Store user preferences (mute status, custom insults)
- Track website visit counts (stored locally only)
- Sync settings across devices (via Chrome's built-in sync, optional)

## Permissions
- **storage**: Used to save your settings locally
- **<all_urls>**: Required to inject the duck on web pages

## Third-Party Services
This extension does NOT:
- Send data to external servers
- Use analytics or tracking
- Make external API calls
- Share data with third parties

## Chrome Sync
If you enable Chrome sync, your settings may sync across your devices using Google's built-in Chrome sync feature. This is optional and controlled by your Chrome settings.

## Contact
For questions: https://github.com/TAIJULAMAN/passive-aggressive-crome-extention

## Changes
We may update this policy. Check this page for updates.
```

**Where to host privacy policy:**
- GitHub Pages (easiest)
- Your own website
- GitHub README (add privacy section)

---

## 🎯 Quick Publishing Checklist

- [ ] Register Chrome Web Store developer account ($5)
- [ ] Create ZIP package (8 files only, no docs)
- [ ] Capture 3-5 screenshots (1280x800)
- [ ] Write store listing (use templates above)
- [ ] Host privacy policy (GitHub Pages or README)
- [ ] Upload ZIP to Chrome Web Store
- [ ] Fill in all required fields
- [ ] Submit for review
- [ ] Wait 1-3 days for approval

---

## 💡 Tips for Approval

✅ **DO:**
- Use clear, accurate description
- Provide good screenshots
- Include privacy policy
- Test thoroughly before submitting
- Use appropriate category

❌ **DON'T:**
- Use misleading descriptions
- Include copyrighted content
- Violate Chrome Web Store policies
- Use excessive permissions
- Submit broken extensions

---

## 🔄 After Publishing

Once approved:
1. Share on social media
2. Add Chrome Web Store badge to GitHub README
3. Monitor reviews and feedback
4. Update regularly with new features
5. Respond to user reviews

---

## 📊 Monetization (Optional)

Future options:
- Keep it free (recommended for fun projects)
- Add premium features
- Accept donations
- Offer custom duck themes

---

**Ready to publish? Follow the steps above and your duck will be judging coders worldwide! 🦆**
