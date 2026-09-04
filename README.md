# Cousins Day Website 🥳

A modern, vibrant, and interactive web application built to celebrate **National Cousins Day** (July 24th). Designed for families and cousins to share childhood memories, vote in superlative awards, take cousin personality quizzes, plan upcoming reunions, and post shoutouts.

![Cousins Day Preview](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- ⏳ **Live Cousins Day Countdown**: Dynamic timer counting down days, hours, minutes, and seconds until the next National Cousins Day (July 24).
- 📸 **Interactive Memory Vault & Lightbox**: Photo gallery showcasing throwback moments and family getaways with category filters (*Reunions*, *Throwbacks*, *Adventures*, *Holidays*), custom photo/story submission, and full-screen lightbox preview.
- 🏆 **Cousin Hall of Fame (Superlative Voting)**: Real-time interactive voting for funny cousin awards (*"Reunion Host Champion"*, *"Family Comedian"*, *"Grill Master"*, *"Gaming Champ"*).
- 🤔 **"Which Cousin Are You?" Personality Quiz**: 4-question interactive quiz identifying your cousin archetype (*The Life of the Party*, *The Mastermind*, *The Adventurer*, *The Chill Cousin*) with instant confetti celebration.
- 📅 **Reunion & Event Planner**: Event schedule card, potluck dish tracker, and instant RSVP submission form with dynamic attendee counter.
- 💌 **Cousin Shoutout Guestbook**: Live message board for cousins to post shoutouts, funny stories, and virtual hugs with avatar emojis.
- 💾 **Persistent Browser Storage**: All RSVPs, added memories, voted awards, and guestbook posts persist seamlessly using `localStorage`.

---

## 🛠️ Built With

- **HTML5 & CSS3**: Semantic layout, modern glassmorphic design system, responsive flexbox & grid containers.
- **Tailwind CSS**: Rapid utility styling, custom brand color palette, dark mode aesthetics.
- **Vanilla JavaScript (ES6+)**: Zero dependencies logic controller managing modals, timers, state management, and quiz calculations.
- **FontAwesome**: Modern vector iconography.
- **Canvas-Confetti**: High-energy celebratory confetti explosions.

---

## 🌐 Deploying to Netlify

This repository includes a `netlify.toml` file configured for instant, zero-build deployment:

### Method 1: Import GitHub Repository to Netlify (Recommended)
1. Log in to [Netlify App](https://app.netlify.com/).
2. Click **"Add new site"** -> **"Import an existing project"**.
3. Select **GitHub** and authorize access to `Powell561/cousinsday`.
4. Leave settings as default:
   - **Branch to deploy**: `main`
   - **Build command**: *(leave blank)*
   - **Publish directory**: `.` (or root)
5. Click **"Deploy cousinsday"**. Netlify will build and generate your custom URL (e.g., `https://cousinsday.netlify.app`) with automatic updates on every Git push!

### Method 2: Netlify CLI
Run the following commands in your terminal:
```bash
npx netlify-cli deploy --prod
```

---

## 📁 Repository Structure

```
cousinsday/
├── index.html       # Main HTML5 page layout & components
├── styles.css       # Custom glassmorphism, scrollbars, and keyframe animations
├── script.js        # Dynamic features, state management, timer, quiz & modals
├── netlify.toml     # Netlify deployment and security configuration
└── README.md        # Documentation and deployment instructions
```

---

## ❤️ Made for Cousins Everywhere!
