// Configuration file for Duckudge
const DUCKUDGE_CONFIG = {
  // Timing constants (in milliseconds)
  TIMINGS: {
    CHATGPT_DELAY: 3000,        // 3 seconds
    TWITTER_DELAY: 10000,       // 10 seconds (use 5000 for testing)
    BUBBLE_DURATION: 8000,      // 8 seconds
    TYPING_RESET_INTERVAL: 5000, // 5 seconds
    STACKOVERFLOW_WINDOW: 600000, // 10 minutes
    STORAGE_DEBOUNCE: 1000,     // 1 second
    KEYBOARD_THROTTLE: 100      // 100ms
  },

  // Thresholds
  THRESHOLDS: {
    RAPID_TYPING: 50,           // 50 keystrokes
    SO_VISIT_COUNT: 3           // 3 visits in 10 minutes
  },

  // URL patterns for judgment
  URL_PATTERNS: {
    chatgpt: ['chatgpt.com', 'openai.com'],
    twitter: ['twitter.com', 'x.com'],
    localhost: ['localhost', '127.0.0.1'],
    stackoverflow: ['stackoverflow.com'],
    reddit: ['reddit.com']
  },

  // Default insult collections
  INSULTS: {
    general: [
      "I've seen cleaner code in a spaghetti factory.",
      "Are you sure you want to commit that?",
      "Maybe you should take a break. A permanent one.",
      "Works on my machine... because I'm a picture.",
      "That's not a bug, that's a feature... of bad code.",
      "Have you tried turning it off and leaving it off?",
      "I'm rubber, you're... also struggling.",
      "Ctrl+Z is your best friend, isn't it?"
    ],
    chatgpt: [
      "Oh great. Letting the robot do your job again? I'm sure that will end well.",
      "ChatGPT can't fix your logic, Dave.",
      "Copy-pasting AI code? Bold strategy."
    ],
    twitter: [
      "Your deadline isn't moving, but sure, keep scrolling. This is definitely 'research'.",
      "Twitter won't fix your bugs, but go off.",
      "Procrastination level: Expert."
    ],
    localhost: [
      "It's still broken, isn't it? I can smell the syntax error from here.",
      "Localhost:3000 - Where dreams go to crash.",
      "Another 'quick fix' that took 3 hours?"
    ],
    stackoverflow: [
      "Wow, back again? Have you tried actually READING the documentation?",
      "Copy-paste time! Hope you find a solution that isn't 8 years old.",
      "Stack Overflow: Because reading docs is too mainstream.",
      "Third time's the charm... or is it the 30th?"
    ],
    typing: [
      "Typing harder won't fix the logic, Dave.",
      "Slow down there, speed racer. Quality over quantity.",
      "Mashing the keyboard won't compile your code."
    ]
  },

  // Easter egg messages
  EASTER_EGGS: {
    reddit: "Reddit? Really? Your code can wait, I guess.",
    konami: "🎮 You're a legend! Now get back to coding.",
    lateNight: "It's 2 AM. Go to bed. Seriously.",
    weekend: "It's the weekend. Touch grass.",
    rapidTabs: "ADHD much? Focus on ONE thing."
  },

  // Animation settings
  ANIMATIONS: {
    SHAKE_DURATION: 200,        // 200ms
    FADE_DURATION: 300,         // 300ms
    GROWTH_SCALE: 2             // 2x size for Reddit
  }
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.DUCKUDGE_CONFIG = DUCKUDGE_CONFIG;
}
