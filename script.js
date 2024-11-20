document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from propagating to the body click event
        hamburger.classList.toggle("active");
        navLinks.classList.toggle('show');
    });

    body.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && event.target !== hamburger) {
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });

    navLinks.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) { 
            navLinks.classList.remove('show');
            hamburger.classList.remove('active');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            if (window.innerWidth <= 1024) {
                event.stopPropagation();
            }

            navItems.forEach(i => i.classList.remove('active-item'));

            item.classList.add('active-item');
        });
    });

    const currentPage = window.location.pathname;

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active-item'); 
        }
    });
});



function copyToClipboard() {
    // Select the phone number
    const phoneNumber = document.getElementById('phone-number').innerText;

    const tempInput = document.createElement('input');
    tempInput.value = phoneNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); 

    document.execCommand('copy');
    document.body.removeChild(tempInput);

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
      currentSlide = totalSlides - 1; 
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0; 
    }
    updateSliderPosition();
  }
  
  function updateSliderPosition() {
    const newTransform = -currentSlide * 100; 
    sliderWrapper.style.transition = 'transform 0.5s ease-out';
    sliderWrapper.style.transform = `translateX(${newTransform}%)`;
  }

  const getPositionX = (event) =>
    event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  
  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    sliderWrapper.style.transition = 'none'; 
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

  sliderWrapper.addEventListener('touchstart', touchStart);
  sliderWrapper.addEventListener('touchmove', touchMove);
  sliderWrapper.addEventListener('touchend', touchEnd);
  
  sliderWrapper.addEventListener('mousedown', touchStart);
  sliderWrapper.addEventListener('mousemove', touchMove);
  sliderWrapper.addEventListener('mouseup', touchEnd);
  sliderWrapper.addEventListener('mouseleave', () => (isDragging = false));

  document.querySelectorAll('.slide').forEach((slide) => {
    slide.addEventListener('mouseenter', () => {
      const image = slide.querySelector('img');
      // image.style.transform = 'scale(1.15)'; 
    });
  
    slide.addEventListener('mouseleave', () => {
      const image = slide.querySelector('img');
      // image.style.transform = 'scale(1.05)'; 
    });
  });
  

