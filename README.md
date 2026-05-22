# Would You Rather? • Premium Edition

A premium, single-page **Would You Rather** web game designed with a modern dark-mode glassmorphic aesthetic, floating neon gradient highlights, custom synthesized sound effects, category deck selectors, local storage persistence, a custom question creator, and a local Duo Compatibility game mode.

## 🚀 Features

- **Double-Card Layout**: Glassmorphic options featuring cool cyan vs. hot pink neon radial glows.
- **Dynamic Stats**: Interactive voting statistics reveal showing vote counts and percentage splits with filling progress bar animations.
- **Progress HUD Tracker**: Real-time counter showing completed question metrics and overall category progress.
- **Progress Resetting**: Instantly wipe votes, streaks, and scores globally or for a specific deck to start fresh.
- **Scrollable Review Summary**: Reaching the end of a card category displays a list of your exact answers alongside voter agreement metrics.
- **Synth Audio System**: Generates custom clicks, pops, and completion chimes on the fly using the browser's native **Web Audio API** (no external file dependencies).
- **Custom Question Creator**: Create your own scenarios and save them directly to your browser's persistent `localStorage`.
- **Duo Party Mode**: Play locally with a partner. Takes turns voting secretly (hides options to prevent cheating), displays agreement results, and calculates a final compatibility matching score.

---

## 🛠️ Tech Stack

- **Core Structure**: HTML5 (semantic layout)
- **Styling**: CSS3 (custom HSL color system, animations, media queries)
- **Logic & Audio**: Vanilla JavaScript ES6

---

## 💻 Local Quick Start

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser, or spin up a local development server:
   ```bash
   npx http-server
   ```
3. Open `http://localhost:8080` in your web browser.

---

## 🌐 Deploy to GitHub Pages

Since this application is a completely static, single-page site with zero build dependencies, you can host it directly on GitHub Pages for free:

1. Push this project to your repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Choose your branch (e.g., `main`) and folder (usually `/ (root)`), then click **Save**.
5. After a few minutes, your site will be live at `https://<your-username>.github.io/<repository-name>/`.
