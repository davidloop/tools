# Live SCSS Preview Instructions

This guide shows you how to watch SCSS files and preview changes live in the browser.

## Setup (Already Done)

1. VSCode with Live Sass Compile extension installed
2. live-server installed globally (`npm install -g live-server`)
3. Configuration in `.vscode/settings.json` for Live Sass Compile

## For Standalone SCSS Files (css/index.scss)

### Step 1: Watch SCSS Files
1. Open VSCode
2. Open the SCSS file you want to edit (e.g., `css/index.scss`)
3. Start Live Sass Compile by:
   - Clicking "Watch Sass" in the status bar at the bottom of VSCode, OR
   - Using the keyboard shortcut (Alt+Shift+W on Windows/Linux, ⌥⇧W on Mac), OR
   - Opening the command palette (Ctrl+Shift+P or Cmd+Shift+P) and typing "Live Sass: Watch Sass"

### Step 2: Preview in Browser
1. In your terminal, navigate to the project root directory
2. Run live-server to start a development server:
   ```
   live-server
   ```
3. This will open your default browser with the index.html file
4. Make changes to your SCSS file and save
5. The browser will automatically refresh to show your changes

## For React Project (react-tools)

### Step 1: Watch SCSS Files
1. Open VSCode
2. Open the SCSS file you want to edit (e.g., `react-tools/src/index.scss`)
3. Start Live Sass Compile as described above

### Step 2: Run React Development Server
1. In your terminal, navigate to the React project directory:
   ```
   cd react-tools
   ```
2. Start the React development server:
   ```
   npm start
   ```
3. This will open your browser with the React app
4. Make changes to your SCSS file and save
5. The browser will automatically refresh to show your changes

## Quick Commands

### For Standalone Files
```bash
# From project root
live-server
```

### For React Project
```bash
# From project root
cd react-tools && npm start
```

## Troubleshooting

- If Live Sass Compile isn't working, check the output panel in VSCode (View > Output > Live Sass Compile)
- Make sure your HTML file is correctly linking to the compiled CSS file
- For React, ensure your JS files are importing the compiled CSS file, not the SCSS file directly
