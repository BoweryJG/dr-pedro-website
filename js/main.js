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
      afterSupabaseReady();
    };
    document.head.appendChild(script);
  } else {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    afterSupabaseReady();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Section fade-in on scroll
  const sections = document.querySelectorAll('main section');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
  });

  // FAQ toggle
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function () {
      this.parentElement.classList.toggle('open');
    });
  });

  // Contact form validation and feedback
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simple validation
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(f => {
        if (!f.value.trim()) valid = false;
      });
      if (!valid) {
        showFormMsg('Please fill in all fields.', false);
        return;
      }
      // TODO: send to Supabase
      showFormMsg('Thank you! We received your message.', true);
      form.reset();
    });
  }

  function showFormMsg(msg, success) {
    let el = document.getElementById('formMsg');
    if (!el) {
      el = document.createElement('div');
      el.id = 'formMsg';
      form.parentElement.insertBefore(el, form);
    }
    el.textContent = msg;
    el.className = success ? 'form-success' : 'form-error';
    setTimeout(() => { el.textContent = ''; }, 4000);
  }

  // Blog fetch from Supabase
  const blogList = document.getElementById('blog-list');
  function renderBlog(posts) {
    if (!blogList) return;
    if (!posts.length) {
      blogList.innerHTML = '<p>No blog posts yet.</p>';
      return;
    }
    blogList.innerHTML = posts.map(post =>
      `<article><h3>${post.title}</h3><p>${post.summary || ''}</p></article>`
    ).join('');
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
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input, textarea').forEach(f => {
        if (!f.value.trim()) valid = false;
      });
      if (!valid) {
        showFormMsg('Please fill in all fields.', false);
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
          showFormMsg('Error sending message. Please try again.', false);
          return;
        }
        showFormMsg('Thank you! We received your message.', true);
        form.reset();
      } else {
        showFormMsg('Supabase not ready.', false);
      }
    });
  }

  function showFormMsg(msg, success) {
    let el = document.getElementById('formMsg');
    if (!el) {
      el = document.createElement('div');
      el.id = 'formMsg';
      form.parentElement.insertBefore(el, form);
    }
    el.textContent = msg;
    el.className = success ? 'form-success' : 'form-error';
    setTimeout(() => { el.textContent = ''; }, 4000);
  }

  // Dark mode toggle
  const darkBtn = document.createElement('button');
  darkBtn.textContent = '🌙 Dark Mode';
  darkBtn.className = 'button secondary';
  darkBtn.style.position = 'fixed';
  darkBtn.style.bottom = '24px';
  darkBtn.style.right = '24px';
  darkBtn.style.zIndex = '9999';
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
