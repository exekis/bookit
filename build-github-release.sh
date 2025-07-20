#!/bin/bash
echo "Building Bookit Extension v1.3 for GitHub Release..."

# Clean up any existing builds
rm -rf build-github/
rm -f bookit-extension-v1.3.zip
rm -f bookit-chrome-v1.3.zip
rm -f bookit-firefox-v1.3.zip

# Create build directory
mkdir -p build-github

echo "Building Chrome package..."
# Build Chrome version
mkdir -p build-github/chrome
cp manifest_chrome.json build-github/chrome/manifest.json
cp background.js popup.js popup.html build-github/chrome/
cp -r icons/ build-github/chrome/
cd build-github/chrome
zip -r ../../bookit-chrome-v1.3.zip .
cd ../..

echo "Building Firefox package..."
# Build Firefox version  
mkdir -p build-github/firefox
cp manifest_firefox.json build-github/firefox/manifest.json
cp background.js popup.js popup.html build-github/firefox/
cp -r icons/ build-github/firefox/
cd build-github/firefox
zip -r ../../bookit-firefox-v1.3.zip .
cd ../..

echo "Creating source package..."
# Create source code package (excluding build files and git)
zip -r bookit-extension-v1.3.zip . -x "build-*/*" "*.zip" ".git/*" ".gitignore" "node_modules/*"

echo "Packages created:"
echo "- bookit-chrome-v1.3.zip (Chrome Web Store)"
echo "- bookit-firefox-v1.3.zip (Firefox Add-ons)"  
echo "- bookit-extension-v1.3.zip (Source code)"

# Clean up build directory
rm -rf build-github/

echo "Ready for GitHub release!"
