# Netlify CMS Setup Guide

## What's been set up

✅ **Admin panel** - Located at `/admin/` (open at `yourdomain.com/admin`)
✅ **Blog post structure** - Markdown files stored in `/posts/` 
✅ **Dynamic blog page** - `blog.html` now loads posts dynamically
✅ **Individual post viewer** - `post.html` displays full posts
✅ **Post manifest** - `posts/manifest.json` tracks all blog files
✅ **Sample post** - Example post to show how it works

## Next Steps: Deploy to Netlify

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Add Netlify CMS for collaborative blogging"
git push origin main
```

### 2. **Deploy to Netlify** (FREE)
1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → Select **"Import an existing project"**
3. Choose GitHub → Select `notcooley/notcooley.github.io` repo
4. Click **Deploy**

### 3. **Enable Git Gateway for Authentication**
1. In Netlify dashboard, go to **Site Settings** → **Build & Deploy** → **Access Control**
2. Click **Enable Git Gateway** under "Authentication providers"
3. This allows your friends to log in with GitHub

### 4. **Add Users to Repository** (for non-coders)
For friends without GitHub accounts:
1. In Netlify, go to **Team** → **Members** 
2. Invite them with their email
3. They can now access `/admin` and publish posts!

---

## How It Works for Your Friends

### Adding a Blog Post (Web Interface)
1. Go to `yourdomain.com/admin`
2. Log in with GitHub (or email if invited to Netlify)
3. Click **"Blog Posts"** in the left sidebar
4. Click **"New Post"**
5. Fill in:
   - **Title** - Post title
   - **Author** - Their name
   - **Publish Date** - When it goes live
   - **Description** - Post excerpt (optional)
   - **Tags** - Comma-separated tags
   - **Body** - Write in Markdown
6. Click **"Publish"** - Changes commit to GitHub automatically! 

### Alternative: Manual GitHub Editing
If they're comfortable with GitHub:
1. Clone/fork the repo
2. Create new file in `/posts/` with naming: `YYYY-MM-DD-title.md`
3. Use this format:
```markdown
---
title: My Blog Post
author: Friend Name
date: 2025-05-03T10:00:00Z
description: Brief description
tags:
  - Tag1
  - Tag2
---

Your post content in markdown goes here...
```
4. Submit a pull request
5. You approve and merge

---

## File Structure

```
notcooley.github.io/
├── admin/
│   ├── config.yml      (CMS configuration)
│   └── index.html      (Admin panel interface)
├── posts/
│   ├── manifest.json   (List of all posts)
│   └── *.md            (Blog posts in markdown)
├── js/
│   └── post-loader.js  (Loads posts dynamically)
├── blog.html           (Blog home page)
├── post.html           (Single post viewer)
└── index.html          (Main portfolio)
```

---

## Troubleshooting

### "Admin panel shows blank"
- Make sure site is deployed to Netlify (not just GitHub Pages)
- Clear browser cache and reload
- Check browser console for errors

### "Changes not appearing"
- The `posts/manifest.json` needs to be updated when new posts are added
- If using Netlify CMS, it auto-updates this file
- If adding posts manually via GitHub, update the manifest manually

### "Posts loading as 'Loading...'"
- Check that post files exist in `/posts/` folder
- Verify filenames match in `manifest.json`
- Check browser console for CORS/fetch errors

---

## Tips for You

- **Moderate posts?** All changes happen via Pull Requests - you get to review before they're published
- **Remove a post?** Delete the markdown file and update `manifest.json`
- **Customize styling?** Edit CSS in `blog.html` and `post.html`
- **Add categories?** Update the CMS config in `admin/config.yml` to add new collection types

---

## Questions?

Check Netlify CMS docs: https://www.netlifycms.org/docs/
