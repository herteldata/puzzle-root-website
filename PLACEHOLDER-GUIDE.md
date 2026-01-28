# Placeholder Content Guide

This guide shows you exactly where to find and update placeholder content throughout the site.

## 📝 Text Content to Personalize

### 1. Home Page (index.html)

**Hero Section** (lines 52-55)
```html
<h1 class="hero-title">Welcome to Puzzle Root</h1>
<p class="hero-subtitle">Exercise your mind with engaging puzzles and creative challenges</p>
```
Update the tagline to match your brand voice.

**About Section** (lines 72-88)
```html
<h3>The Puzzles</h3>
<p>
    Puzzle Root creates engaging, thoughtful puzzles that challenge your mind and bring joy to problem-solving.
    From word puzzles to visual brain teasers, each puzzle is carefully crafted to provide that perfect "aha!" moment.
</p>

<h3>The Designer</h3>
<p>
    With a background in product management and a passion for creative problem-solving, Puzzle Root combines
    analytical thinking with playful design. Every puzzle is an invitation to see the world from a different angle,
    to find patterns in chaos, and to experience the satisfaction of discovery.
</p>
```
Replace with your actual story, background, and puzzle design philosophy.

### 2. Meta Descriptions (all HTML files)
### NOT DONE YET
**index.html** (line 7)
```html
<meta name="description" content="Puzzle Root - Engaging puzzles and brain teasers designed by a passionate puzzle creator. Solve Instagram puzzles and exclusive website challenges.">
```

**instagram-puzzles.html** (line 6)
```html
<meta name="description" content="Solve puzzles from Puzzle Root's Instagram feed. Test your problem-solving skills with engaging brain teasers.">
```

**website-puzzles.html** (line 6)
```html
<meta name="description" content="Exclusive website puzzles from Puzzle Root. Unique brain teasers you won't find anywhere else.">
```

Update these to better reflect your brand and improve SEO.

### 3. Page Subtitles

**instagram-puzzles.html** (line 45)
```html
<p>Puzzles from <a href="https://www.instagram.com/puzzle_root/">@puzzle_root</a></p>
```

**website-puzzles.html** (line 45)
```html
<p>Exclusive brain teasers you won't find anywhere else</p>
```

## 🧩 Puzzle Data to Update

### Instagram Puzzles (data/instagram-puzzles.json)

Currently has 3 placeholder puzzles:
- Uses placeholder images from via.placeholder.com
- Generic titles and captions
- Example answers: "example answer", "pattern", "solution"
- Placeholder Instagram URLs

**To update:**
1. Go to your Instagram posts on @puzzle_root
2. For each puzzle post:
   - Copy the post link (instagramUrl)
   - Right-click image → "Copy image address" (imageUrl)
   - Copy the caption text
   - Add the correct answer
3. Replace the placeholder entries or add new ones

### Website Puzzles (data/website-puzzles.json)

Currently has 2 placeholder puzzles:
- References non-existent image files
- Generic puzzle descriptions
- Example answers: "hidden message", "64"

**To update:**
1. Create your puzzle images
2. Save them to `images/puzzles/`
3. Update the JSON with real puzzle data
4. Make sure imageUrl points to your actual files

See `data/PUZZLE-TEMPLATE.md` for the exact format.

## 🖼️ Images to Add

### Puzzle Images

**Location**: `images/puzzles/`

The website-puzzles.json references:
- `/images/puzzles/placeholder-1.jpg` - doesn't exist yet
- `/images/puzzles/placeholder-2.jpg` - doesn't exist yet

You'll need to add your actual puzzle images here.

**Recommendations**:
- Format: JPG or PNG
- Max width: 1200px
- Optimize before uploading (use TinyPNG.com or similar)
- Use descriptive filenames: `word-search-jan-2026.jpg`

### Logo

**Current**: `images/brand/logo.png` (already in place)

This is your "Profile Logo.png" file. If you want to update it:
- Replace the file at `images/brand/logo.png`
- OR rename your new logo to logo.png
- Keep dimensions reasonable (current logo height: 50px in nav)

## 📧 Contact Information

### Contact Form Email

Currently configured to send to: **puzzleroot@icloud.com**

This is hardcoded in the form setup. When you deploy to Netlify, you'll configure the email destination in the Netlify dashboard (not in the code).

## 🎨 Optional Customizations

### Colors (css/style.css, lines 10-18)

Current design system:
```css
--color-brand-green: rgb(56, 122, 61);
--color-navy: #1a2238;
--color-white: #ffffff;
--color-amber: #f39c12;
--color-sage: #e8f5e9;
```

These match your brand green and our chosen style guide. Change if needed.

### Fonts (all HTML files)

Currently using:
- **Headings**: Futura (with fallbacks)
- **Body**: Inter (loaded from Google Fonts)

If Futura isn't available on user's system, it falls back to system fonts. This is intentional for performance.

## 📍 Quick Reference: File Locations

| Content Type | File | Lines |
|-------------|------|-------|
| Hero text | index.html | 52-55 |
| About section | index.html | 72-88 |
| Instagram puzzles | data/instagram-puzzles.json | All |
| Website puzzles | data/website-puzzles.json | All |
| Meta descriptions | All .html files | ~line 7 |
| Contact email | Netlify dashboard | (after deployment) |
| Colors | css/style.css | 10-18 |
| Logo | images/brand/logo.png | n/a |

## ✅ What's Already Filled In

You don't need to change:
- Navigation structure
- Footer copyright (has 2026, will need updating in future years)
- Social media link to @puzzle_root
- Overall page structure
- Form fields
- JavaScript functionality

## 🚀 Recommended Order for Updates

1. **First**: Add 2-3 real Instagram puzzles to test the system
2. **Second**: Update the About section with your story
3. **Third**: Create and add 1-2 website puzzles
4. **Fourth**: Refine meta descriptions for SEO
5. **Fifth**: Polish hero/tagline if needed

---

All placeholder content is clearly marked and ready for your updates!
