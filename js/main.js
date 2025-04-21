// main.js for Dr. Greg Pedro Site
// Animations, blog fetch, FAQ, contact, CRM logic

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

  // Blog fetch (Supabase integration placeholder)
  // TODO: Fetch posts from Supabase
  const blogList = document.getElementById('blog-list');
  if (blogList) {
    blogList.innerHTML = '<p>Loading blog posts...</p>';
    // Placeholder: Replace with Supabase fetch
    setTimeout(() => {
      blogList.innerHTML = '<article><h3>How Implants Change Lives</h3><p>Discover the latest in dental implant technology and patient success stories...</p></article>' +
        '<article><h3>TMJ Relief: What Works?</h3><p>Learn about new TMJ treatments and how Dr. Pedro helps patients find comfort...</p></article>';
    }, 1000);
  }
});
