// Post Loader - Dynamically loads and displays blog posts from markdown files

async function loadPosts() {
  try {
    // Fetch list of posts from GitHub API
    const githubRepo = 'notcooley/notcooley.github.io';
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/contents/posts`);
    const files = await response.json();
    
    const postsContainer = document.getElementById('posts-container');
    const posts = [];

    // Filter and fetch markdown files
    for (const file of files) {
      if (file.name.endsWith('.md')) {
        const postResponse = await fetch(file.download_url);
        const content = await postResponse.text();
        const post = parseMarkdownPost(content, file.name);
        posts.push(post);
      }
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render posts
    if (posts.length === 0) {
      postsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">No posts yet. Check back soon!</p>';
      return;
    }

    posts.forEach(post => {
      const html = createPostHTML(post);
      postsContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    // Fallback: try loading from local posts folder if API fails
    loadPostsLocal();
  }
}

async function loadPostsLocal() {
  try {
    const response = await fetch('posts/manifest.json');
    const postFiles = await response.json();
    
    const postsContainer = document.getElementById('posts-container');
    const posts = [];

    for (const file of postFiles) {
      const postResponse = await fetch(`posts/${file}`);
      const content = await postResponse.text();
      const post = parseMarkdownPost(content, file);
      posts.push(post);
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach(post => {
      const html = createPostHTML(post);
      postsContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('Error loading posts from local:', error);
    document.getElementById('posts-container').innerHTML = '<p>Error loading posts.</p>';
  }
}

function parseMarkdownPost(content, filename) {
  // Parse frontmatter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  let frontmatter = {};
  let body = content;

  if (match) {
    const raw = match[1];
    frontmatter = parseFrontmatter(raw);
    body = content.replace(frontmatterRegex, '').trim();
  }

  return {
    ...frontmatter,
    body: body,
    slug: filename.replace('.md', '')
  };
}

function parseFrontmatter(yaml) {
  const obj = {};
  const lines = yaml.split('\n');

  lines.forEach(line => {
    if (!line.trim()) return;
    const [key, ...valueParts] = line.split(':');
    let value = valueParts.join(':').trim();

    // Handle arrays
    if (value.startsWith('[')) {
      value = JSON.parse(value);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    obj[key.trim()] = value;
  });

  return obj;
}

function createPostHTML(post) {
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readTime = Math.ceil(post.body.split(/\s+/).length / 200); // Estimate 200 words per minute

  const tagsHTML = post.tags && post.tags.length > 0
    ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
    : '';

  // Get excerpt (first 200 characters)
  const excerpt = post.body.split('\n').find(line => line.trim() && !line.startsWith('#'))?.substring(0, 200) + '...';

  return `
    <article class="blog-post">
      <div class="blog-post-header">
        <h2>${post.title || 'Untitled'}</h2>
        <div class="blog-meta">
          <span>${formattedDate}</span>
          <span>${readTime} min read</span>
          <span>${post.author || 'Anonymous'}</span>
        </div>
      </div>
      <div class="blog-post-content">
        <p>${post.description || excerpt}</p>
      </div>
      ${tagsHTML ? `<div class="tags">${tagsHTML}</div>` : ''}
      <a href="post.html?slug=${post.slug}" class="read-more">Read Full Post</a>
    </article>
  `;
}

// Load posts when page is ready
document.addEventListener('DOMContentLoaded', loadPosts);
