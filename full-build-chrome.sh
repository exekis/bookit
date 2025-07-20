#!/bin/bash
echo "Building Chrome extension package..."

# Clean up any existing build
rm -rf build-chrome/
rm -f bookit-chrome-v1.3.zip

# Create build directory
mkdir -p build-chrome

# Copy Chrome manifest
cp manifest_chrome.json build-chrome/manifest.json

# Copy all necessary files
cp background.js build-chrome/
cp popup.js build-chrome/
cp popup.html build-chrome/
cp -r icons/ build-chrome/

# Create zip file
cd build-chrome
zip -r ../bookit-chrome-v1.3.zip .
cd ..

echo "Chrome package created: bookit-chrome-v1.3.zip"