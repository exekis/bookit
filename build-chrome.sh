#!/bin/bash
# Build script for Chrome
echo "Building for Chrome..."
cp manifest.json manifest_backup.json 2>/dev/null || true
cp manifest_chrome.json manifest.json
echo "Chrome build ready. Use manifest.json for Chrome extension."
