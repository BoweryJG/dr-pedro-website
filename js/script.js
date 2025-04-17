$(document).ready(function(){
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
});