#!/bin/bash
# Build script for Firefox
echo "Building for Firefox..."
cp manifest.json manifest_backup.json 2>/dev/null || true
cp manifest_firefox.json manifest.json
echo "Firefox build ready. Use manifest.json for Firefox extension."
