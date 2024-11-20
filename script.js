document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    const navItems = document.querySelectorAll('.nav-links li'); // Select all list items in the nav-links

    // Toggle the 'show' class when the hamburger is clicked
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from propagating to the body click event
        hamburger.classList.toggle("active");
        navLinks.classList.toggle('show');
    });

    // Close the navbar when clicking anywhere outside the navbar and hamburger (but not on menu items)
    body.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && event.target !== hamburger) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });

    // Prevent click event from propagating to the document when clicking inside the nav-links
    navLinks.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Close the hamburger menu when the screen is resized to desktop size (and hide the active class)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) { 
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });

    // Add 'active-item' class to clicked nav item and remove from others (and do not close the menu on mobile)
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            if (window.innerWidth <= 1024) {
                event.stopPropagation(); // Prevent closing on mobile/tablet
            }
            
            // Remove 'active-item' class from all nav items
            navItems.forEach(i => i.classList.remove('active-item'));

            // Add 'active-item' class to the clicked item
            item.classList.add('active-item');
        });
    });

    // Highlight the current page in the menu based on the URL
    const currentPage = window.location.pathname; // Get the current URL path

    // Check all navItems for the current page
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active-item'); // Add 'active-item' class to the matching menu item
        }
    });
});



function copyToClipboard() {
    // Select the phone number
    const phoneNumber = document.getElementById('phone-number').innerText;

    // Create a temporary input element to copy text
    const tempInput = document.createElement('input');
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile compatibility

    // Copy the text to the clipboard
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show feedback (optional)
    alert('Phone number copied: ' + phoneNumber);
  }

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const sliderWrapper = document.querySelector('.slider-wrapper');
  
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  
  function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1; // Go to the last slide if it's the first one
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0; // Go back to the first slide if it's the last one
    }
    updateSliderPosition();
  }
  
  function updateSliderPosition() {
    const newTransform = -currentSlide * 100; // Move the slider to the next slide
    sliderWrapper.style.transition = 'transform 0.5s ease-out';
    sliderWrapper.style.transform = `translateX(${newTransform}%)`;
  }
  
  // Swipe handling
  const getPositionX = (event) =>
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  
  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    sliderWrapper.style.transition = 'none'; // Disable smooth transition during drag
  }
  
  function touchMove(event) {
    if (!isDragging) return;
    const currentPos = getPositionX(event);
    currentTranslate = prevTranslate + currentPos - startPos;
    sliderWrapper.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
  
    if (movedBy < -50 && currentSlide < totalSlides - 1) {
      currentSlide++;
    } else if (movedBy > 50 && currentSlide > 0) {
      currentSlide--;
    }
    updateSliderPosition();
    prevTranslate = -currentSlide * 100;
  }
  
  // Add event listeners for swipe functionality
  sliderWrapper.addEventListener('touchstart', touchStart);
  sliderWrapper.addEventListener('touchmove', touchMove);
  sliderWrapper.addEventListener('touchend', touchEnd);
  
  sliderWrapper.addEventListener('mousedown', touchStart);
  sliderWrapper.addEventListener('mousemove', touchMove);
  sliderWrapper.addEventListener('mouseup', touchEnd);
  sliderWrapper.addEventListener('mouseleave', () => (isDragging = false));
  
  // Image hover effect (optional)
  document.querySelectorAll('.slide').forEach((slide) => {
    slide.addEventListener('mouseenter', () => {
      const image = slide.querySelector('img');
      // image.style.transform = 'scale(1.15)'; // Uncomment for zoom effect
    });
  
    slide.addEventListener('mouseleave', () => {
      const image = slide.querySelector('img');
      // image.style.transform = 'scale(1.05)'; // Uncomment for zoom effect
    });
  });
  

