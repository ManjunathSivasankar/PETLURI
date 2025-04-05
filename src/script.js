// Helper function for DOM selection
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// Mobile menu toggle
const menuToggle = select('.menu-toggle');
const navMenu = select('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return; // Skip if it's just a '#' link
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
const header = select('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    header.style.padding = '5px 0';
  } else {
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    header.style.padding = '10px 0';
  }
});

// Testimonial slider
const testimonialTrack = select('.testimonial-track');
const testimonialItems = selectAll('.testimonial-item');
const prevBtn = select('.prev-btn');
const nextBtn = select('.next-btn');

if (testimonialTrack && testimonialItems.length > 0) {
  // Initial setup
  let currentIndex = 0;
  const maxIndex = testimonialItems.length - 1;
  
  // Update slider position
  const updateSlider = () => {
    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  };
  
  // Next slide
  const nextSlide = () => {
    currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  };
  
  // Previous slide
  const prevSlide = () => {
    currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  };
  
  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  if (testimonialTrack) {
    testimonialTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
    testimonialTrack.addEventListener('mouseleave', () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
}

// Form validation and submission
const contactForm = select('#enquiry-form');
const formStatus = select('#form-status');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = select('#name').value.trim();
    const email = select('#email').value.trim();
    const phone = select('#phone').value.trim();
    const course = select('#course').value.trim();
    
    // Reset previous error messages
    formStatus.innerHTML = '';
    formStatus.className = '';
    
    // Validate inputs
    if (!name || !email || !phone || !course) {
      formStatus.innerHTML = 'Please fill in all required fields.';
      formStatus.className = 'error';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.innerHTML = 'Please enter a valid email address.';
      formStatus.className = 'error';
      return;
    }
    
    // Display success message
    formStatus.innerHTML = 'Thank you for your enquiry! Our team will contact you shortly.';
    formStatus.className = 'success';
    
    // Reset form
    contactForm.reset();
    
    // In a real implementation, you would send the form data to your server here
  });
}

// Chat button functionality
const chatButton = select('.chat-button');

if (chatButton) {
  chatButton.addEventListener('click', () => {
    alert('Chat with us! Please call +91 9876543210 or email info@pertluriedutech.com for immediate assistance.');
  });
}
