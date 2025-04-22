// Parallax background effect and section reveal animation

document.addEventListener('DOMContentLoaded', function () {
  // Parallax effect for backgrounds with .parallax-bg
  window.addEventListener('scroll', function () {
    document.querySelectorAll('.parallax-bg').forEach(function (el) {
      const speed = 0.3;
      const offset = window.pageYOffset;
      el.style.backgroundPosition = 'center ' + Math.round(offset * speed) + 'px';
    });
  });

  // Section reveal animation on scroll
  const reveals = document.querySelectorAll('.section-reveal');
  function revealSections() {
    const trigger = window.innerHeight * 0.92;
    reveals.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealSections);
  revealSections();
});
