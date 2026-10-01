<div align="center">

#  Doomy

**Stop doomscrolling. Take back your time.**

A lightweight browser extension that blocks Reels and Shorts so you can use social media without getting sucked into the endless scroll.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

##  About

Short-form video feeds are designed to keep you scrolling. **Doomy** removes them from the places you actually need, so you can still watch the videos you *choose* to watch, without the infinite feed pulling you in.


##  Supported Browsers

| Browser | Supported |
| ------- | :-------: |
| Google Chrome | ✅ |
| Microsoft Edge | ✅ |
| Brave | ✅ |
| Opera / Vivaldi | ✅ (any Chromium-based browser) |

---

##  Installation

Doomy is installed as an unpacked extension. This takes about two minutes.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/YashRajSahu44/doomy.git
cd doomy
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Build the extension

```bash
npm run build
```

This creates a `dist/` folder containing the ready-to-load extension.

### Step 4: Load it into your browser

1. Open your browser and go to the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
2. Turn on **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select the **`dist`** folder inside the `doomy` project.
5. Doomy now appears in your extensions list. Click the  puzzle icon in the toolbar and **pin** Doomy for quick access.

### Step 5: You're done 

Open a site with Reels or Shorts and see Doomy at work. If the page was already open, **refresh it** once.

### 🔄 Updating

```bash
git pull
npm install
npm run build
```

Then go to your extensions page and click the **reload** (↻) icon on the Doomy card.

---

##  Development

Want to tinker with it or contribute?

```bash
npm run dev
```

This starts the Vite dev server with hot reload. Load the generated output folder (shown in the terminal, usually `dist/`) as an unpacked extension the same way as above, and changes will update live.

### Available scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run lint` | Run ESLint on the project |
| `npm run preview` | Preview the production build |

## 📁 Project Structure

```
doomy/
├── public/              # Static assets (icons, etc.)
├── src/
│   ├── assets/          # Images and static resources
│   ├── App.jsx          # Popup UI
│   ├── App.css          # Popup styles
│   ├── content.js       # Content script that does the blocking
│   ├── content.css      # Styles injected into web pages
│   ├── index.css        # Global styles
│   └── main.jsx         # React entry point
├── manifest.config.js   # Extension manifest configuration
├── vite.config.js       # Vite configuration
├── eslint.config.js     # Lint rules
└── package.json
```

##  How It Works

1. A **content script** (`content.js`) runs on supported pages.
2. It detects Reels and Shorts elements and links in the page.
3. It hides or removes them using injected styles (`content.css`) and DOM observation, so content loaded as you scroll is caught too.
4. The **popup** (`App.jsx`) lets you control the extension.

##  Tech Stack

- **React**: popup interface
- **Vite**: fast builds and dev server
- **Chrome Extension Manifest V3**
- **JavaScript (ES6+)**

##  Troubleshooting

**Extension doesn't show up after loading**
Make sure you selected the `dist` folder (not the project root) and that you ran `npm run build` first.

**Reels or Shorts still appear**
Refresh the page after installing. Sites change their layouts often, so if it still happens, please [open an issue](https://github.com/YashRajSahu44/doomy/issues).

**Changes not showing up**
After rebuilding, click the reload (↻) icon on the Doomy card in your extensions page, then refresh the website.
r giving it a ⭐

</div>
