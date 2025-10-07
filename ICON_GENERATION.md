# Icon Generation Guide

## Required Icon Files

To complete the favicon and icon setup, you need to generate the following files in the `public/` directory:

### Favicon Files
- `favicon-16x16.png` (16x16px)
- `favicon-32x32.png` (32x32px)
- `favicon.ico` (multi-size ICO file)

### Apple Touch Icons
- `apple-touch-icon.png` (180x180px)

### Android Chrome Icons
- `android-chrome-192x192.png` (192x192px)
- `android-chrome-512x512.png` (512x512px)

### Safari Pinned Tab
- `safari-pinned-tab.svg` (monochrome SVG)

### Social Media Images
- `og-image.png` (1200x630px for Open Graph)
- `twitter-card.png` (1200x600px for Twitter)

## Source Icon

Use the `plane-icon.svg` file as your source. This is the Lucid React plane icon in amber (#f59e0b) on a transparent background.

## Generation Methods

### Option 1: Online Favicon Generator
1. Go to https://realfavicongenerator.net/
2. Upload `plane-icon.svg`
3. Configure settings:
   - Background: Transparent or dark (#18181b)
   - Theme color: #f59e0b
4. Download and extract to `public/` directory

### Option 2: Manual Creation
1. Use the `plane-icon.svg` as a template
2. Create PNG versions at required sizes
3. Ensure consistent styling across all sizes

### Option 3: Automated Script
Run the generation script:
```bash
node scripts/generate-icons.js
```

## Brand Guidelines

- **Primary Color**: #f59e0b (amber-400)
- **Background**: Transparent or #18181b (zinc-900)
- **Style**: Clean, minimal, sophisticated
- **Icon**: Lucid React plane icon only

## Verification

After generating all icons, verify:
1. All files are in the `public/` directory
2. Sizes match specifications exactly
3. Colors are consistent with brand
4. Icons display correctly in browsers
5. Social media previews work properly
