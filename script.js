document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Handle hamburger menu click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Prevent click from closing the menu if clicked inside
    navLinks.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close hamburger menu when clicking outside
    document.addEventListener('click', (event) => {
        // Check if the click is outside of the hamburger or navLinks
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Mark the current page's link as active
    const currentPage = window.location.pathname;
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active-item');
        }
    });

    // Slider functionality
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Move slide based on direction
    function moveSlide(direction) {
        currentSlide += direction;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1; // Loop back to last slide
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0; // Loop back to first slide
        }
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Slider buttons (prev and next)
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));

    // Optional: Add touch/swipe functionality to the slider
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    const getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        sliderWrapper.style.transition = 'none'; // Disable smooth transition
        animationID = requestAnimationFrame(animation);
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPos = getPositionX(event);
        currentTranslate = prevTranslate + currentPos - startPos;
        sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentSlide < totalSlides - 1) {
            currentSlide++;
        } else if (movedBy > 50 && currentSlide > 0) {
            currentSlide--;
        }
        sliderWrapper.style.transition = 'transform 0.5s ease-out';
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        prevTranslate = -currentSlide * 100;
    }

    // Animation loop for drag effect
    function animation() {
        if (isDragging) requestAnimationFrame(animation);
    }

    // Add event listeners for touch and mouse
    sliderWrapper.addEventListener('touchstart', touchStart);
    sliderWrapper.addEventListener('touchmove', touchMove);
    sliderWrapper.addEventListener('touchend', touchEnd);

    sliderWrapper.addEventListener('mousedown', touchStart);
    sliderWrapper.addEventListener('mousemove', touchMove);
    sliderWrapper.addEventListener('mouseup', touchEnd);
    sliderWrapper.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
    });

    // Pop-up visibility functionality with IntersectionObserver
    const popUpElements = document.querySelectorAll('.pop-up'); // Select all elements with the .pop-up class

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.05) { 
                // Trigger when at least 50% of the element is visible
                entry.target.classList.add('visible'); // Add 'visible' class to make it appear
            } else {
                entry.target.classList.remove('visible'); // Remove 'visible' class when less than 50% visible
            }
        });
    }, {
        threshold: [0.05], // Trigger when 50% of the element is visible
        rootMargin: '10px 0px -50px 0px', // Optional: Make adjustments to trigger margin
    });

    // Start observing each .pop-up element
    popUpElements.forEach(element => observer.observe(element));
});
