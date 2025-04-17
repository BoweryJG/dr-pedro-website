// Simple blog data (replace with CMS or API in production)
const blogPosts = [
  {
    title: "The Truth About Dental Implants",
    date: "2024-04-10",
    excerpt: "Discover why dental implants are the gold standard for restoring smiles, and how Dr. Pedro ensures a painless, natural result.",
    url: "#"
  },
  {
    title: "How Emface is Changing Facial Aesthetics",
    date: "2024-03-28",
    excerpt: "Learn how non-invasive Emface treatments can rejuvenate your appearance with zero downtime.",
    url: "#"
  },
  {
    title: "TMJ Pain Relief: What Really Works?",
    date: "2024-03-15",
    excerpt: "Explore the latest advances in TMJ therapy and how Dr. Pedro delivers lasting comfort.",
    url: "#"
  }
];

function renderBlog() {
  const container = document.getElementById('blog-articles');
  if (!container) return;
  container.innerHTML = blogPosts.map(post => `
    <article class="blog-card section-reveal">
      <h2>
        <a href="${post.url}">${post.title}</a>
      </h2>
      <div class="blog-meta">${post.date}</div>
      <p>${post.excerpt}</p>
      <a href="${post.url}" class="button secondary">Read More</a>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderBlog);

// Fake subscribe form
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    subscribeForm.reset();
  });
}
