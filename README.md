# Puzzle Root Website

A personal brand website for Puzzle Root puzzle design business, featuring interactive puzzles from Instagram and exclusive website content.

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript (no build tools required)
- **Styling**: Custom CSS with design system
- **Data**: JSON files for puzzle storage
- **Progress Tracking**: Browser localStorage
- **Hosting**: Netlify (recommended) or Vercel
- **Forms**: Netlify Forms for contact submissions

## Project Structure

```
puzzle-root-website/
├── index.html                      # Home page
├── instagram-puzzles.html          # Instagram puzzles section
├── website-puzzles.html            # Website puzzles section
├── css/
│   ├── style.css                   # Main styles
│   └── animations.css              # Celebration animations
├── js/
│   ├── navigation.js               # Menu and navigation
│   └── puzzles.js                  # Puzzle logic and answer checking
├── data/
│   ├── instagram-puzzles.json      # Instagram puzzle data
│   ├── website-puzzles.json        # Website puzzle data
│   └── PUZZLE-TEMPLATE.md          # Template for adding puzzles
├── images/
│   ├── brand/
│   │   └── logo.png                # Puzzle Root logo
│   └── puzzles/                    # Puzzle images
├── prd.md                          # Product requirements document
└── README.md                       # This file
```

## Getting Started

### 1. Local Testing

Simply open `index.html` in a web browser to view the site locally. However, for full functionality (loading JSON files), you should use a local server:

**Option A: Python (if installed)**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Node.js (if installed)**
```bash
npx http-server -p 8000
```

**Option C: VS Code**
Install the "Live Server" extension and click "Go Live" in the bottom right.

Then visit `http://localhost:8000` in your browser.

### 2. Testing Before Deployment

See the TESTING.md file for a comprehensive testing checklist.

## Adding Puzzles

### Instagram Puzzles

1. Open `data/instagram-puzzles.json` in a text editor
2. Add a new puzzle object to the array following this format:

```json
{
  "id": "ig-004",
  "title": "Your Puzzle Title",
  "imageUrl": "URL to Instagram image",
  "caption": "Your puzzle caption/description",
  "answer": "correct answer",
  "instagramUrl": "https://www.instagram.com/p/POST_ID/",
  "datePublished": "2026-01-27"
}
```

**To get Instagram post details:**
1. Go to your Instagram post
2. Click "..." → "Copy link" for the `instagramUrl`
3. Right-click image → "Copy image address" for `imageUrl`
4. Copy your caption for the `caption` field

### Website Puzzles

1. Save your puzzle image to `images/puzzles/` folder
   - Use descriptive filenames: `word-search-puzzle.jpg`
   - Optimize images before uploading (use tools like TinyPNG)
   - Recommended size: max 1200px wide

2. Open `data/website-puzzles.json` in a text editor
3. Add a new puzzle object:

```json
{
  "id": "web-003",
  "title": "Your Puzzle Title",
  "imageUrl": "/images/puzzles/your-image.jpg",
  "description": "Full puzzle description and instructions",
  "answer": "correct answer",
  "datePublished": "2026-01-27"
}
```

### Important Notes About Answers

- Answers are case-insensitive: "Answer" = "answer" = "ANSWER"
- Whitespace is normalized: "the answer" = "theanswer" = " the  answer "
- Keep answers simple to avoid user frustration
- Store answers in lowercase in JSON for consistency

### Scheduled Publishing

Puzzles can be pre-scheduled to automatically appear at a specific date and time.

**DateTime Format:**
```json
"datePublished": "2026-02-20T09:00:00-06:00"
```

**Format:**
- Date: YYYY-MM-DD
- Time: HH:MM:SS (24-hour format)
- Timezone: `-06:00` (CST) or `-05:00` (CDT)

**How it works:**
- Puzzles with future dates are hidden from users
- They automatically appear when the scheduled time arrives
- Add all puzzles at once and commit - no manual updates needed
- Perfect for matching Instagram post schedules

**Preview Mode:**
Add `?preview=true` to any URL to see unpublished puzzles:
- `http://localhost:8000/instagram-puzzles.html?preview=true`
- `http://localhost:8000/website-puzzles.html?preview=true`
- `http://localhost:8000/?preview=true`

Useful for testing before puzzles go live.

### Tips

- Use unique IDs (ig-001, ig-002, etc.)
- Date format must be YYYY-MM-DD
- Newest puzzles appear first on the home page (sorted by `datePublished`)
- Test each puzzle after adding it
- Commit changes to Git after adding puzzles

## Deployment to Netlify

### First Time Setup

1. **Create a Netlify account** at https://netlify.com

2. **Push your code to GitHub**:
```bash
git add .
git commit -m "Initial commit: Puzzle Root website"
gh repo create puzzle-root-website --public --source=. --push
```

3. **Connect to Netlify**:
   - Log in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings: (leave blank - no build process needed)
   - Click "Deploy site"

4. **Configure contact form**:
   - Netlify automatically detects the contact form
   - Go to Site Settings → Forms
   - Add email notification: puzzleroot@icloud.com

5. **Custom domain** (when ready):
   - Purchase domain from Namecheap, Google Domains, or Cloudflare
   - In Netlify: Site Settings → Domain Management → Add custom domain
   - Follow DNS configuration instructions
   - Netlify automatically provisions SSL certificate

### Updating the Site

Every time you make changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

Netlify automatically rebuilds and deploys your site within 1-2 minutes!

## Editing the Site

### Changing Colors

Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --color-brand-green: rgb(56, 122, 61);
    --color-navy: #1a2238;
    --color-amber: #f39c12;
    /* ... */
}
```

### Changing Text Content

- **About section**: Edit `index.html` around line 85
- **Hero text**: Edit `index.html` around line 50
- **Page titles**: Edit the `<title>` tags in each HTML file

### Changing the Logo

Replace `images/brand/logo.png` with your new logo file. Keep the same filename or update all references in the HTML files.

### Contact Form Email

To change where form submissions go:
1. Log in to Netlify
2. Go to Site Settings → Forms
3. Update the notification email address

## Troubleshooting

### Puzzles not loading
- Check that JSON files are valid (use JSONLint.com)
- Ensure file paths are correct (case-sensitive on servers)
- Check browser console for errors (F12 → Console)

### Images not showing
- Verify image paths start with `/images/`
- Check that image files exist in the correct folder
- Ensure images are web-optimized (JPG or PNG, not too large)

### Progress not saving
- Check that browser allows localStorage
- Try a different browser
- Check browser console for errors

### Contact form not working
- Ensure form has `data-netlify="true"` attribute
- Check Netlify dashboard for form submissions
- Verify email notification is configured in Netlify

## Browser Support

This site works on all modern browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## Accessibility

The site follows WCAG 2.1 AA standards:
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatible
- Reduced motion support for animations

## Performance

- Optimized images (lazy loading)
- Minimal JavaScript
- No external dependencies
- Fast page loads (<2 seconds)
- Mobile-friendly
- SEO optimized

## License

© 2026 Puzzle Root. All rights reserved.

## Questions or Issues?

For questions about maintaining this website, refer to:
- `data/PUZZLE-TEMPLATE.md` for puzzle format details
- `prd.md` for original requirements and design decisions
- Browser console (F12) for debugging errors

---

Built with care for Puzzle Root 🧩
