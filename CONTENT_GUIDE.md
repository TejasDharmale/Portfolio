# Content Guide — How to Update Your Portfolio

All portfolio content lives in the `content/` folder as plain JSON files.
Edit a file, commit, push → Netlify auto-deploys → site updates live.
No code changes needed.

---

## Folder structure

```
content/
  profile.json          ← name, email, links, bio, image paths
  education.json        ← degrees & institutions
  experience.json       ← jobs & internships
  projects.json         ← project cards in the carousel
  publications.json     ← research papers & presentations
  skills.json           ← skill categories & items
  recommendations.json  ← LinkedIn-style recommendations

public/
  images/
    hero.png            ← photo shown on Home page
    about.png           ← photo shown on About page
    recommenders/
      hao-fu.png        ← recommender headshots
```

---

## Adding / changing your photo

1. Drop the new `.png` or `.jpg` into `public/images/`
2. Open `content/profile.json` and update the `heroImage` or `aboutImage` field:
   ```json
   "heroImage": "/images/your-new-photo.png",
   "aboutImage": "/images/your-new-photo.png"
   ```
3. Commit and push — done.

You can also use an external URL (e.g. from Google Photos, Cloudinary, Unsplash):
```json
"heroImage": "https://example.com/your-photo.jpg"
```

---

## profile.json — personal info

```json
{
  "name": "Your Name",
  "title": "Your title shown under the typewriter",
  "subtitle": "Short credential line",
  "location": "City, Country",
  "email": "you@email.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "scholar": "https://scholar.google.com/...",
  "tagline": "One sentence bio shown on hero and about page.",
  "heroImage": "/images/hero.png",
  "aboutImage": "/images/about.png"
}
```

---

## education.json — add a new degree

Append a new object to the array:

```json
{
  "institution": "University Name",
  "degree": "Degree Name",
  "location": "City, Country",
  "period": "2020 - 2024",
  "highlights": [
    "Optional bullet point",
    "Another bullet"
  ]
}
```

Leave `highlights` as `[]` if you have nothing to add.

---

## experience.json — add a new role

```json
{
  "role": "Job Title",
  "org": "Company Name · Type (Internship / Full-time)",
  "period": "Month Year - Month Year",
  "summary": "One paragraph description.",
  "highlights": [
    "Bullet one",
    "Bullet two"
  ],
  "image": "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1400&q=80"
}
```

For `image` you can use:
- An Unsplash URL (already configured)
- A local file: put it in `public/images/` and use `"/images/filename.jpg"`

---

## projects.json — add a new project

```json
{
  "name": "Project Name",
  "url": "https://github.com/you/repo",
  "description": "What it does in 1-2 sentences.",
  "tech": ["Python", "React", "Docker"],
  "impact": "Measurable result or outcome.",
  "category": "AI Systems",
  "image": "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1400&q=80",
  "featured": true
}
```

---

## publications.json — add a new paper

```json
{
  "title": "Full paper title",
  "venue": "Conference or Journal Name",
  "year": 2025,
  "authors": ["A. Author", "B. Author", "S. Dharmale"],
  "kind": "Conference Paper",
  "url": "https://link-to-paper.com"
}
```

`kind` can be anything: `"Conference Paper"`, `"Journal Paper"`, `"Conference Presentation"`, `"Workshop Paper"`.

---

## skills.json — add a new skill category

```json
{
  "title": "Category Name",
  "icon": "BrainCircuit",
  "items": ["Skill A", "Skill B", "Skill C"]
}
```

Available icon names: `BrainCircuit`, `Cloud`, `Cpu`, `Database`, `Workflow`, `Wrench`,
`Sparkles`, `SearchCode`, `ShieldCheck`, `FlaskConical`, `Layers`, `Presentation`,
`GraduationCap`, `MonitorSmartphone`, `BriefcaseBusiness`, `ChartNoAxesCombined`.

---

## recommendations.json — add a new recommendation

1. Put the recommender's photo in `public/images/recommenders/firstname-lastname.png`
2. Add to the array:

```json
{
  "recommender": "Full Name",
  "title": "Their Job Title at Company",
  "relationship": "Month Year - How they know you",
  "body": "Full recommendation text.",
  "note": "Optional footnote.",
  "image": "/images/recommenders/firstname-lastname.png"
}
```

---

## API — live data endpoint

Every section is also available as a JSON API (used internally by the site):

```
GET /api/content/profile
GET /api/content/education
GET /api/content/experience
GET /api/content/projects
GET /api/content/publications
GET /api/content/skills
GET /api/content/recommendations
```

---

## Deploy pipeline

```
Edit content/*.json or add to public/images/
        ↓
git add . && git commit -m "update content"
        ↓
git push
        ↓
Netlify detects push → runs npm run build → deploys
        ↓
Site live at your Netlify URL (~ 1-2 minutes)
```
