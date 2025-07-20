# Bookit

This is **Bookit**, a little Firefox/Chrome extension I made for people (like me) who keep way too many tabs open (sometimes). You don't want to close them because they might be important, maybe some research, an article, or just tabs you don't want to lose. But now you can't restart your browser or shut down your computer because you're scared you'll lose it all.

Here's what Bookit does: you click the button, and it saves all your tabs into a folder called `Bookit` in your bookmarks. Inside that folder, it creates another one with today's date. If you use it again on the same day, it'll number the folder so that they don't get messy.

That's it. Now you can close/restart your browser. When you're ready, just go to the folder, right-click, and reopen everything :)

Get it on [Chrome](https://chromewebstore.google.com/detail/bookit/aciacgkaikpibanahejepijpgbagiebe?hl=en&pli=1) or [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/bookit/)

## Development Setup

### Cross-Browser Compatibility

This extension supports both Chrome and Firefox through different manifest versions:

#### Building for Different Browsers

**Using NPM Scripts (Recommended):**
```bash
# For Chrome development
npm run dev:chrome

# For Firefox development  
npm run dev:firefox

# Build for both browsers
npm run build:all
```

**Using Shell Scripts:**
```bash
# For Chrome
./build-chrome.sh

# For Firefox
./build-firefox.sh
```

#### Manual Setup

**Chrome (Manifest V3):**
1. Run `npm run dev:chrome` or copy `manifest_chrome.json` to `manifest.json`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select this folder

**Firefox (Manifest V2):**
1. Run `npm run dev:firefox` or copy `manifest_firefox.json` to `manifest.json`
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

## Features

- **Save All Tabs**: Bookmark all open tabs with one click
- **Smart Organization**: Automatically organizes bookmarks by date
- **Combine Folders**: Move all bookmark folders into an archive
- **Visual Feedback**: Button text changes to confirm completion
- **Cross-Browser**: Works on both Chrome and Firefox

## File Structure

- `manifest_chrome.json` - Chrome-specific manifest (Manifest V3)
- `manifest_firefox.json` - Firefox-specific manifest (Manifest V2)
- `background.js` - Cross-browser background script
- `popup.js` - Cross-browser popup script
- `popup.html` - Extension popup interface
- `build-*.sh` - Build scripts for each browser
- `package.json` - NPM scripts for building
