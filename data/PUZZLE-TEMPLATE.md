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

## Tips

- Use unique IDs (ig-001, ig-002 or web-001, web-002)
- Keep answers lowercase in the JSON for consistency
- Date format: YYYY-MM-DD (e.g., 2026-01-27)
- Test your puzzle on the site after adding it
- The most recent puzzles appear first on the home page
