#!/bin/bash
echo "Building Firefox extension package..."

# Clean up any existing build
rm -rf build-firefox/
rm -f bookit-firefox-v1.3.zip

# Create build directory
mkdir -p build-firefox

# Copy Firefox manifest
cp manifest_firefox.json build-firefox/manifest.json

# Copy all necessary files
cp background.js build-firefox/
cp popup.js build-firefox/
cp popup.html build-firefox/
cp -r icons/ build-firefox/

# Create zip file
cd build-firefox
zip -r ../bookit-firefox-v1.3.zip .
cd ..

echo "Firefox package created: bookit-firefox-v1.3.zip"