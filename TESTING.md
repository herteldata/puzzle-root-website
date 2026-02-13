# Testing Checklist

Complete this checklist before deploying the Puzzle Root website to production.

## 🧪 Local Testing (Before Deployment)

### Basic Functionality

- [ ] Site loads without errors in browser console (F12 → Console)
- [ ] All pages are accessible (Home, Instagram Puzzles, Website Puzzles)
- [ ] Logo displays correctly on all pages
- [ ] Footer appears on all pages

### Navigation

- [ ] Hamburger menu opens when clicked
- [ ] Hamburger menu closes when clicking outside
- [ ] Hamburger menu closes when pressing Escape key
- [ ] All navigation links work correctly
- [ ] Navigation links highlight the active page
- [ ] On desktop (>768px), menu displays horizontally
- [ ] On mobile, menu slides in from the right
- [ ] Menu closes when clicking a link on mobile

### Home Page

- [ ] Hero section displays with title and subtitle
- [ ] Recent puzzles load and display (mix of Instagram and website)
- [ ] Solve counter shows correct count
- [ ] About section displays with placeholder text
- [ ] Social media link to Instagram works
- [ ] Contact form displays all fields
- [ ] Smooth scrolling to #about and #contact sections

### Instagram Puzzles Page

- [ ] Page loads and displays header
- [ ] Solve counter shows "X of Y Instagram puzzles"
- [ ] All Instagram puzzle cards display
- [ ] Images load correctly
- [ ] Captions display correctly
- [ ] "View on Instagram" links work
- [ ] Answer input boxes appear for unsolved puzzles

### Website Puzzles Page

- [ ] Page loads and displays header
- [ ] Solve counter shows "X of Y website puzzles"
- [ ] All website puzzle cards display
- [ ] Images load correctly (or placeholder shown)
- [ ] Descriptions display correctly
- [ ] Answer input boxes appear for unsolved puzzles

### Puzzle Answer System

- [ ] Submitting empty answer shows validation message
- [ ] Correct answer triggers celebration (confetti)
- [ ] Correct answer shows "Correct! 🎉" message
- [ ] Puzzle card gets green checkmark badge
- [ ] Answer is displayed after solving
- [ ] Input box disappears after solving
- [ ] Incorrect answer shows "Try Again" message
- [ ] Incorrect answer clears the input field
- [ ] Answer matching is case-insensitive ("Answer" = "answer")
- [ ] Answer matching ignores extra spaces ("the answer" = "theanswer")

### Progress Tracking

- [ ] Solving a puzzle updates the solve counter immediately
- [ ] Solved puzzles stay solved after page refresh
- [ ] Solved puzzles show checkmark on all pages
- [ ] Solve counter is accurate across all pages
- [ ] Progress persists in localStorage (check DevTools → Application → Local Storage)

### Scheduled Publishing

- [ ] Puzzles with future `datePublished` are hidden from regular view
- [ ] Counters only count published puzzles (not future ones)
- [ ] Preview mode (`?preview=true`) shows all puzzles including future ones
- [ ] Preview mode works on Instagram puzzles page
- [ ] Preview mode works on Website puzzles page
- [ ] Preview mode works on Home page carousel
- [ ] Published puzzles appear automatically after their scheduled time
- [ ] Puzzle with past datetime is immediately visible

### Contact Form

**Note**: Full testing requires Netlify deployment. For local testing:

- [ ] All form fields are present (Name, Email, Message)
- [ ] Required fields are marked with *
- [ ] Email field validates email format
- [ ] Submit button is present and clickable
- [ ] Form has proper labels for accessibility

## 📱 Responsive Design Testing

Test on these viewport sizes:

### Mobile (320px - 480px)
- [ ] Layout is single column
- [ ] Hamburger menu appears
- [ ] Logo is appropriately sized
- [ ] Images are full-width and responsive
- [ ] Text is readable (not too small)
- [ ] Buttons are easily tappable
- [ ] No horizontal scrolling
- [ ] Puzzle cards stack vertically

### Tablet (481px - 768px)
- [ ] Layout adjusts appropriately
- [ ] Images scale correctly
- [ ] Navigation still uses hamburger menu
- [ ] Content is readable

### Desktop (>768px)
- [ ] Navigation displays horizontally
- [ ] Content has proper max-width
- [ ] Images maintain aspect ratio
- [ ] Puzzle cards are well-spaced

**Testing Tools**:
- Browser DevTools responsive mode (F12 → Toggle device toolbar)
- Actual devices if available
- responsivedesignchecker.com

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Can open/close hamburger menu with Enter/Space
- [ ] Can submit forms with Enter key
- [ ] Can navigate entire site without mouse
- [ ] No keyboard traps

### Screen Reader
- [ ] Headings are in logical order (h1 → h2 → h3)
- [ ] Images have alt text
- [ ] Form inputs have labels
- [ ] Navigation has proper ARIA labels
- [ ] Links have descriptive text

**Testing Tools**:
- Tab through the site manually
- WAVE browser extension
- Lighthouse audit in Chrome DevTools

### Color Contrast
- [ ] Text on white background passes contrast check
- [ ] White text on green buttons passes contrast check
- [ ] All text is readable

**Testing Tool**:
- WebAIM Contrast Checker
- Lighthouse audit

## 🌐 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Check for**:
- Layout consistency
- Animation performance
- localStorage support
- CSS Grid/Flexbox support

## 🔒 Security Testing

### Form Security
- [ ] Contact form has honeypot field for spam prevention
- [ ] No sensitive data stored in localStorage
- [ ] No inline JavaScript in HTML (all in external files)
- [ ] No user input is rendered without sanitization

### Content Security
- [ ] JSON files are properly formatted
- [ ] Image URLs are from trusted sources
- [ ] External links use rel="noopener noreferrer"

### Data Privacy
- [ ] No tracking scripts or analytics (unless you add them)
- [ ] No cookies used
- [ ] localStorage only stores puzzle progress (no personal data)

## ⚡ Performance Testing

### Page Load Speed
- [ ] Home page loads in <3 seconds
- [ ] Images are optimized
- [ ] No render-blocking resources
- [ ] Lazy loading works for images

**Testing Tool**:
- Lighthouse audit in Chrome DevTools
- PageSpeed Insights

### Lighthouse Scores (aim for >90)
- [ ] Performance: ___
- [ ] Accessibility: ___
- [ ] Best Practices: ___
- [ ] SEO: ___

## 🔍 SEO Testing

- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions
- [ ] Images have descriptive alt text
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Internal links work correctly
- [ ] No broken links

## 🚀 Pre-Deployment Checklist

Before pushing to Netlify:

- [ ] All placeholder content updated (or documented)
- [ ] Real puzzle data added (or test data is clearly marked)
- [ ] Logo is in place
- [ ] Contact form email is correct
- [ ] Git repository is clean (`git status`)
- [ ] All files are committed
- [ ] README.md is accurate

## 📡 Post-Deployment Testing (After Netlify)

### Netlify Deployment
- [ ] Site deploys without errors
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS/SSL certificate is active
- [ ] Site loads at live URL

### Contact Form (Netlify Forms)
- [ ] Form submissions appear in Netlify dashboard
- [ ] Email notifications are received at puzzleroot@icloud.com
- [ ] Form spam filtering is enabled
- [ ] Test submission with real data

### Production Testing
- [ ] All functionality works on live site
- [ ] No console errors on live site
- [ ] Images load correctly from production
- [ ] JSON data loads correctly
- [ ] Test on real mobile device

## 🐛 Common Issues to Check

- [ ] Mixed content warnings (HTTP images on HTTPS site)
- [ ] CORS errors loading JSON (should not occur on same domain)
- [ ] localStorage disabled in private browsing
- [ ] Case-sensitive file paths on server (works local but not production)
- [ ] Missing trailing slashes in URLs

## ✅ Final Sign-Off

Once all items are checked:

- [ ] Testing completed by: ________________
- [ ] Date: ________________
- [ ] Ready for production: Yes / No
- [ ] Known issues documented: ________________

---

## Quick Test Command

For a quick sanity check, run through this 2-minute test:

1. Open site in browser
2. Click through all navigation links
3. Submit an answer to a puzzle
4. Check that it saves (refresh page)
5. Open browser console - no errors
6. Test on mobile view (DevTools)
7. Submit contact form (after deployment)

If all pass → You're good to go! 🎉
