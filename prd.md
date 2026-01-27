# Puzzle Root Website - Product Requirements Document

## Project Overview
A personal brand website for Puzzle Root (@puzzle_root), a puzzle design business. The site serves as both a portfolio and interactive platform for publishing and solving puzzles.

## Target Audience
- Puzzle enthusiasts
- Potential clients for custom puzzle design
- Social media followers from Instagram
- New visitors discovering the brand

## User Background & Constraints
- Product manager with 10+ year-old HTML/CSS/JS knowledge
- First time setting up a complete website end-to-end
- Prefers understanding implementation details over black-box solutions
- Willing to learn and integrate third-party services

## Design Requirements

### Visual Design
- **Style**: Classic puzzle aesthetic - clean, trustworthy, professional with nature-inspired elements
- **Color Palette**:
  - Primary: Brand Green `rgb(56, 122, 61)` - buttons, links, solved states, primary accents
  - Base: Deep Navy `#1a2238` - text, headers
  - Background: Crisp White `#ffffff`
  - Secondary Accent: Amber `#f39c12` - secondary call-to-actions, highlights
  - Subtle Background: Light Sage `#e8f5e9` - cards, subtle sections
- **Typography**:
  - Headings: Futura (geometric sans-serif)
  - Body Text: Inter (clean, highly readable)
  - Fallbacks: system fonts for performance
- **Responsive Design**: Must work seamlessly on mobile, tablet, and desktop
  - Mobile-first approach
  - Images: full-width responsive
  - Hamburger navigation menu
- **Accessibility**: Follow WCAG 2.1 AA standards minimum
  - Proper heading hierarchy
  - Sufficient color contrast (tested against Navy and White backgrounds)
  - Alt text for all puzzle images
  - Keyboard navigation support
  - Screen reader compatibility
  - Form labels and ARIA attributes

## Functional Requirements

### Navigation System
**Type**: Hamburger menu (mobile-first design)

**Behavior**:
- Collapsed menu icon visible in header on all pages
- Expands on click to show navigation links
- Links: Home | Instagram Puzzles | Website Puzzles | About | Contact
- Closes when user selects a link or clicks outside
- Accessible via keyboard navigation
- ARIA labels for screen readers

**Desktop**: Can expand to always-visible horizontal nav on larger screens (optional enhancement)

### Progress Tracking UI
**Display Elements**:
- **Solve Counter**: Prominent display showing "You've solved X puzzles" or "X of Y puzzles solved"
  - Updates in real-time when user solves a puzzle
  - Encouraging and shows progress
  - Positioned prominently on puzzle pages
- **Visual Indicators**: Checkmark badges on puzzle cards
  - Green checkmark icon appears on solved puzzles
  - Helps users quickly identify which puzzles they've completed
  - Persists across sessions via localStorage

**Data Source**: Browser localStorage
- Key: `puzzleProgress` (JSON object mapping puzzle IDs to solve status)
- Anonymous and privacy-friendly
- No user accounts or tracking

### 1. Home Page
**Purpose**: Landing page showcasing recent work and brand introduction

**Layout**: Simple vertical list - stacks content vertically for easy mobile scrolling

**Components**:
- Hero section with brand identity and tagline
- Recent puzzles preview (simple vertical list of 4-6 recent puzzles)
  - Mix of Instagram and website puzzles
  - Each shows: thumbnail image, title, solve status indicator
- About section
  - Business description (Puzzle Root brand story)
  - Designer bio/story
- Social media links (Instagram prominently featured)
- Contact form powered by Formspree or Netlify Forms
  - Name field (required)
  - Email field (required, validated)
  - Message field (required, textarea)
  - Submit button (brand green)
  - Success/error messaging
  - Submissions emailed directly to business owner

**User Flow**:
1. Visitor lands on home page
2. Sees recent puzzle examples with solve indicators
3. Reads about the business/designer
4. Can navigate to puzzle sections via hamburger menu
5. Can submit contact form for inquiries

### 2. Instagram Puzzles Section
**Purpose**: Display and enable solving of Instagram-posted puzzles

**Implementation**: Custom-styled cards with manually curated Instagram content
- Owner manually adds Instagram posts to JSON file when posting to Instagram
- Maintains brand consistency and design control
- No dependency on Instagram API or embed reliability

**Components**:
- Grid/list of Instagram puzzle cards
- For each puzzle post:
  - Puzzle image (full-width responsive on mobile)
  - Post caption/description
  - Solve status indicator (checkmark if solved)
  - Answer submission interface (text input + submit button)
  - Validation feedback ("Try Again" message)
  - Celebration animation on correct answer
  - Solved state: displays correct answer, removes input box

**User Flow**:
1. User browses Instagram puzzle cards
2. Attempts to solve a puzzle by entering answer
3. Submits answer (unlimited attempts allowed)
4. Receives immediate feedback:
   - Incorrect: "Try Again" message, can retry immediately
   - Correct: Celebration animation, answer displayed, input removed
5. Progress saved in browser localStorage
6. Solved puzzles show checkmark indicator

**Answer Matching**: Flexible algorithm
- Case-insensitive matching
- Ignores leading/trailing whitespace
- Collapses multiple spaces
- Example: "The Answer", "the answer", "THE  ANSWER " all match

### 3. Website Puzzles Section
**Purpose**: Blog-style platform for original, website-exclusive puzzles

**Implementation**: JSON-based content management
- Puzzles stored in `puzzles.json` file
- Owner edits JSON directly to add new puzzles
- Images stored in `/images/puzzles/` directory
- Chronological ordering (newest first)

**Components**:
- Vertical list of website puzzle posts
- For each puzzle:
  - Puzzle title (h2 heading)
  - Custom image (full-width responsive, optimized for web)
  - Puzzle description/instructions (markdown or HTML)
  - Solve status indicator (checkmark if solved)
  - Answer submission interface (text input + submit button)
  - Validation feedback ("Try Again" message)
  - Celebration animation on correct answer
  - Solved state: displays correct answer, removes input box
- Solve counter displayed: "You've solved X of Y puzzles"

**User Flow**:
1. User navigates to website puzzles via hamburger menu
2. Browses available puzzles in vertical list
3. Reads puzzle content and studies image
4. Enters answer in text input (unlimited attempts)
5. Receives immediate feedback:
   - Incorrect: "Try Again" message, can retry immediately
   - Correct: Celebration animation, answer displayed, input removed, counter updates
6. Progress saved in browser localStorage
7. Returns later: solved puzzles show checkmark and answer

**Answer Matching**: Same flexible algorithm as Instagram puzzles
- Case-insensitive, whitespace-normalized

**Puzzle JSON Structure**:
```json
{
  "id": "unique-id",
  "title": "Puzzle Title",
  "image": "/images/puzzles/puzzle-name.jpg",
  "description": "Puzzle instructions and text",
  "answer": "correct answer",
  "datePublished": "2026-01-27"
}
```

## Technical Architecture - FINAL DECISIONS

### Core Technology Stack
**Frontend Framework**: Vanilla HTML/CSS/JavaScript
- No build process or complex tooling
- Simple, maintainable code
- Easy to understand and modify
- Fast page loads
- Works on any hosting platform

**Why this choice**:
- Aligns with owner's experience level
- Transparent - every line of code is readable
- No dependency management headaches
- Optimized for speed to launch and long-term maintainability
- Can always migrate to a framework later if needed

### Hosting & Deployment
- **Platform**: Netlify or Vercel (free tier)
  - Automatic HTTPS/SSL
  - Global CDN for fast loading
  - Easy Git-based deployment
  - Built-in form handling
- **Domain**: To be purchased (recommendations: Namecheap, Cloudflare, Google Domains)
- **DNS Setup**: Point custom domain to Netlify/Vercel
- **Deployment**: Git push to deploy (GitHub repository)

### Data Storage & Management

**Puzzle Data**: JSON files stored in repository
- `instagram-puzzles.json` - Instagram puzzle data
- `website-puzzles.json` - Website-exclusive puzzles
- Owner edits JSON files directly using text editor
- Version controlled with Git
- Template provided for easy puzzle addition

**Instagram Content**: Manual curation
- Owner adds Instagram posts to JSON when publishing
- Includes: image URL, caption, answer, date, Instagram post URL
- No API dependencies or rate limits
- Full control over what appears on site

**User Progress**: Browser localStorage
- Tracks which puzzles each user has solved
- Stores solve count for statistics
- No backend required
- Privacy-friendly (no tracking, no cookies)
- Users maintain progress on same browser/device

### Forms & Communication
**Contact Form**: Netlify Forms or Formspree (free tier)
- Submissions emailed directly to owner
- No backend code needed
- Spam protection included
- Free tier: 50-100 submissions/month (sufficient for V1)
- Easy HTML integration

### Performance Priorities
**Page Load Speed**: Critical priority
- Optimized images (WebP format with JPEG fallback)
- Minimal JavaScript (only what's needed)
- Inline critical CSS
- Lazy loading for images below fold
- Tested on mobile network speeds

**SEO Optimization**:
- Semantic HTML structure
- Meta tags (title, description, Open Graph)
- Alt text on all images
- Sitemap.xml generated
- Social sharing previews configured
- Clean URLs

### Code Maintainability
- Well-commented code explaining logic
- Consistent naming conventions
- Separate files for different concerns (style.css, puzzles.js, etc.)
- README with instructions for common tasks
- Templates for adding new puzzles
- Version controlled with Git for rollback safety

## Success Metrics
- User engagement (puzzle attempts, solve rates)
- Contact form submissions
- Instagram follower conversion
- Mobile vs. desktop usage
- Puzzle difficulty assessment through solve rates

## Future Considerations (Out of Scope for V1)
- User accounts and leaderboards
- Hint system
- Puzzle difficulty ratings
- User-generated puzzle submissions
- Email newsletter integration
- Puzzle categories/tags
- Search functionality
- Comments/community features

## Decisions Summary

### Questions Answered
1. **Technical approach**: Frontend-focused with third-party services (Netlify/Formspree)
2. **Content management**: Manual JSON editing - simple and transparent
3. **User tracking**: Anonymous localStorage - privacy-friendly, no backend
4. **Instagram integration**: Manual curation - full control, no API complexity
5. **Budget**: Free tier services for V1 (Netlify hosting, Netlify/Formspree forms)
6. **Domain**: To be purchased during setup
7. **Puzzle attempts**: Unlimited - user-friendly, encouraging
8. **Answer matching**: Flexible - case/whitespace insensitive
9. **Categories/difficulty**: Out of scope for V1 (future consideration)
10. **Launch priority**: Speed to market for user feedback

### UI/UX Decisions
- **Home layout**: Simple vertical list
- **Navigation**: Hamburger menu (mobile-first)
- **Instagram display**: Custom cards (not embedded posts)
- **Solve feedback**: Celebration animation + display answer
- **Progress tracking**: Solve counter + checkmark indicators
- **Mobile images**: Full-width responsive
- **Attempts**: Unlimited with no rate limiting

## File Structure
```
puzzle-root-website/
├── index.html                 # Home page
├── instagram-puzzles.html     # Instagram puzzles section
├── website-puzzles.html       # Website puzzles section
├── css/
│   ├── style.css             # Main styles
│   └── animations.css        # Celebration animations
├── js/
│   ├── puzzles.js            # Puzzle logic and answer checking
│   └── navigation.js         # Menu and navigation
├── data/
│   ├── instagram-puzzles.json
│   └── website-puzzles.json
├── images/
│   ├── puzzles/              # Puzzle images
│   └── brand/                # Logo, icons
└── README.md                 # Setup and maintenance guide
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Set up project structure and files
- Implement design system (colors, typography, base styles)
- Build responsive navigation with hamburger menu
- Create home page layout

### Phase 2: Core Features (Week 2)
- Build puzzle display components
- Implement answer checking logic
- Add localStorage progress tracking
- Create celebration animations
- Build contact form

### Phase 3: Content & Polish (Week 3)
- Add initial puzzle content
- Optimize images
- Test accessibility
- Mobile responsive testing
- Cross-browser testing

### Phase 4: Launch (Week 4)
- Purchase and configure domain
- Deploy to Netlify/Vercel
- Set up contact form email
- Final SEO optimization
- Launch and share!

## Next Steps
1. Create project files and structure
2. Develop style guide examples for final approval
3. Begin building HTML/CSS foundation
4. Implement JavaScript puzzle logic
5. Test and iterate
6. Deploy and launch
