// main.js for Dr. Greg Pedro Site
// Animations, blog fetch, FAQ, contact, CRM logic, dark mode

const SUPABASE_URL = 'https://ovrjzqvkeqjzqjzvjpqg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92cmp6cXZrZXFqenFqenZqcHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NTY3NTksImV4cCI6MjAxNDIzMjc1OX0.9q9v1h1bq6j5tq8iA7n8xXGQv7j5F9JZb4KkKkKkKkKk';
let supabase = null;

function initSupabase() {
  if (!window.supabase) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js';
    script.onload = () => {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      // afterSupabaseReady(); // Removed: function not defined
    };
    document.head.appendChild(script);
  } else {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    // afterSupabaseReady(); // Removed: function not defined
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Section fade-in on scroll (more subtle, luxurious)
  const sections = document.querySelectorAll('main section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
  });

  // FAQ toggle (animated, ARIA)
  document.querySelectorAll('.faq-question').forEach(q => {
    q.setAttribute('tabindex', '0');
    q.setAttribute('role', 'button');
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      answer.classList.toggle('faq-open');
    });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Blog fetch from Supabase
  blogList = document.getElementById('blog-list');

  // Contact form validation and feedback
  let form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simple validation
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(f => {
        if (!f.value.trim()) valid = false;
      });
      if (!valid) {
        showFormToast('Please fill in all fields.', false);
        return;
      }
      // TODO: send to Supabase
      showFormToast('Thank you! We received your message.', true);
      form.reset();
    });
  }

  // Floating toast notification for form feedback
  function showFormToast(msg, success) {
    let toast = document.getElementById('formToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'formToast';
      toast.setAttribute('role', 'alert');
      toast.style.position = 'fixed';
      toast.style.bottom = '32px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.minWidth = '220px';
      toast.style.padding = '18px 32px';
      toast.style.borderRadius = '16px';
      toast.style.fontSize = '1.1rem';
      toast.style.fontWeight = '500';
      toast.style.boxShadow = '0 6px 32px #33415522';
      toast.style.zIndex = '99999';
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s cubic-bezier(.4,0,.2,1)';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = success ? 'var(--accent)' : 'var(--pop)';
    toast.style.color = success ? 'var(--primary)' : '#fff';
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 4000);
  }

  // Blog fetch from Supabase
  blogList = document.getElementById('blog-list');
  function renderBlog(posts) {
    if (!blogList) return;
    if (!posts.length) {
      blogList.innerHTML = '<p>No blog posts yet.</p>';
      return;
    }
    blogList.innerHTML = '';
    posts.forEach((post, i) => {
      const article = document.createElement('article');
      article.innerHTML = `<h3>${post.title}</h3><p>${post.summary || ''}</p>`;
      article.style.opacity = '0';
      article.style.transform = 'translateY(32px)';
      article.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
      blogList.appendChild(article);
      setTimeout(() => {
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }
  async function fetchBlog() {
    if (!supabase) return;
    blogList.innerHTML = '<p>Loading blog posts...</p>';
    const { data, error } = await supabase.from('blog').select('*').order('created_at', { ascending: false });
    if (error) {
      blogList.innerHTML = '<p>Error loading blog posts.</p>';
      return;
    }
    renderBlog(data);
  }

  // Contact form validation and feedback (save to Supabase)
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(f => {
        if (!f.value.trim()) valid = false;
      });
      if (!valid) {
        showFormToast('Please fill in all fields.', false);
        return;
      }
      // Save contact to Supabase
      if (supabase) {
        const { error } = await supabase.from('contacts').insert([{
          name: form.name.value,
          email: form.email.value,
          message: form.message.value
        }]);
        if (error) {
          showFormToast('Error sending message. Please try again.', false);
          return;
        }
        showFormToast('Thank you! We received your message.', true);
        form.reset();
      } else {
        showFormToast('Supabase not ready.', false);
      }
    });
  }

  // Dark mode toggle (premium icon, floating, tooltip)
  const darkBtn = document.createElement('button');
  darkBtn.innerHTML = '<span aria-label="Toggle dark mode" title="Toggle dark mode" style="font-size: 1.5rem;">🌙</span>';
  darkBtn.className = 'button secondary';
  darkBtn.style.position = 'fixed';
  darkBtn.style.bottom = '24px';
  darkBtn.style.right = '24px';
  darkBtn.style.width = '48px';
  darkBtn.style.height = '48px';
  darkBtn.style.borderRadius = '50%';
  darkBtn.style.display = 'flex';
  darkBtn.style.alignItems = 'center';
  darkBtn.style.justifyContent = 'center';
  darkBtn.style.padding = '0';
  darkBtn.style.fontSize = '1.5rem';
  darkBtn.style.boxShadow = '0 4px 12px #33415522';
  darkBtn.style.zIndex = '9999';
  darkBtn.setAttribute('aria-label', 'Toggle dark mode');
  darkBtn.setAttribute('title', 'Toggle dark mode');
  document.body.appendChild(darkBtn);
  darkBtn.onclick = () => {
    document.body.classList.toggle('dark');
    darkBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
  };

  // Initialize Supabase and load blog
  function afterSupabaseReady() {
    fetchBlog();
  }
  initSupabase();
});
