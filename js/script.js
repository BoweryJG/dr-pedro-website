$(document).ready(function(){
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Smooth Scrolling
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // GSAP Animations (Example - Hero Section)
    gsap.fromTo("#hero .hero-content", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1, delay: 0.5});
    gsap.fromTo("header", {y: -100}, {y: 0, duration: 0.5, delay: 0});

    // Form Submission Handling (Simple Example - Replace with server-side logic)
    $('#contactForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var form = $(this);
        // Simulate successful submission
        setTimeout(function() {
            $('#formMessage').text('Message sent successfully!');
            form[0].reset(); // Clear form fields
        }, 1000);
    });

    // Hamburger Menu
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('header nav').toggleClass('active');
    });

    // Testimonial Slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    // Hide header on scroll down, show on scroll up
    let lastScroll = 0;
    ScrollTrigger.create({
        onUpdate: self => {
            const cur = self.scroll();
            if (cur > lastScroll && cur > 100) {
                gsap.to('header', {y: '-100%', duration: 0.3, ease: 'power1.out'});
            } else {
                gsap.to('header', {y: '0%', duration: 0.3, ease: 'power1.out'});
            }
            lastScroll = cur;
        }
    });

    // Reveal sections on scroll
    gsap.utils.toArray('section').forEach(sec => {
        if (sec.id && sec.id !== 'hero') {
            gsap.from(sec, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {trigger: sec, start: 'top 80%'},
            });
        }
    });

    // Initialize gallery slider
    $('.gallery-grid').slick({
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        arrows: true,
        adaptiveHeight: true,
    });
});