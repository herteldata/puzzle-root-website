# How to Add Puzzles

## Instagram Puzzles (instagram-puzzles.json)

Copy this template and add to the array in `data/instagram-puzzles.json`:

```json
{
  "id": "ig-XXX",
  "title": "Short descriptive title",
  "imageUrl": "URL to your Instagram image OR local path like /images/puzzles/filename.jpg",
  "caption": "The caption/description from your Instagram post",
  "answer": "the correct answer (case insensitive)",
  "instagramUrl": "https://www.instagram.com/p/YOUR_POST_ID/",
  "datePublished": "YYYY-MM-DD"
}
```

### To get Instagram post details:
1. Go to your Instagram post
2. Click the three dots (...) and select "Copy link"
3. That's your `instagramUrl`
4. Right-click the image and select "Copy image address" for `imageUrl`
5. Copy your caption text for `caption`

## Website Puzzles (website-puzzles.json)

Copy this template and add to the array in `data/website-puzzles.json`:

```json
{
  "id": "web-XXX",
  "title": "Puzzle Title",
  "imageUrl": "/images/puzzles/your-image.jpg",
  "description": "Full puzzle description and instructions. This can be longer than Instagram captions.",
  "answer": "correct answer",
  "datePublished": "YYYY-MM-DD"
}
```

### To add images for website puzzles:
1. Save your puzzle image to `/images/puzzles/`
2. Name it something descriptive (lowercase, hyphens, no spaces)
3. Reference it in the JSON as `/images/puzzles/your-filename.jpg`

## Answer Matching

Answers are matched flexibly:
- **Case insensitive**: "Answer", "answer", "ANSWER" all match
- **Whitespace ignored**: "the answer", "theanswer", " the  answer " all match
- Keep answers simple and avoid special characters when possible

## Scheduled Publishing

Puzzles automatically appear on the site when their `datePublished` datetime arrives. This allows you to pre-schedule puzzles without manual intervention.

### DateTime Format

**Simple date (appears at midnight):**
```json
"datePublished": "2026-02-20"
```

**Scheduled time (recommended):**
```json
"datePublished": "2026-02-20T09:00:00-06:00"
```

**Format breakdown:**
- `2026-02-20` - Date (YYYY-MM-DD)
- `T` - Separator between date and time
- `09:00:00` - Time in 24-hour format (HH:MM:SS)
- `-06:00` - Central Standard Time offset
- `-05:00` - Use during Central Daylight Time (roughly March-November)

**Examples:**
```json
"datePublished": "2026-02-20T09:00:00-06:00"  // Feb 20 at 9:00 AM CST
"datePublished": "2026-07-15T12:30:00-05:00"  // Jul 15 at 12:30 PM CDT
"datePublished": "2026-12-25T08:00:00-06:00"  // Dec 25 at 8:00 AM CST
```

### How It Works

- Puzzles with future `datePublished` are **completely hidden** from users
- They don't appear in puzzle lists or counters
- They automatically become visible when the scheduled time arrives
- No manual updates or deployments needed after initial commit

### Preview Mode (Testing)

To see all puzzles including unpublished ones, add `?preview=true` to any URL:

- `http://localhost:8000/instagram-puzzles.html?preview=true`
- `http://localhost:8000/website-puzzles.html?preview=true`
- `http://localhost:8000/?preview=true`

This lets you test future puzzles before they go live.

## Tips

- Use unique IDs (ig-001, ig-002 or web-001, web-002)
- Keep answers lowercase in the JSON for consistency
- Schedule puzzles to match your Instagram posting schedule
- Add all puzzles at once and commit - they'll appear automatically
- Use preview mode to verify puzzles look correct before they publish
- Test your puzzle on the site after adding it
- The most recent puzzles appear first on the home page
