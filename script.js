// Theme handling code at the top of your script.js
function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }
  
  function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || '';
    const newTheme = currentTheme === 'dark-mode' ? '' : 'dark-mode';
    setTheme(newTheme);
  }
  
  // Initialize theme from localStorage
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  });
  
  // Theme toggle event listener
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Rest of your JavaScript remains the same

const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', function() {
    if (!this.value.trim()) {
      this.parentElement.classList.remove('focused');
    }
  });
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const submitBtn = this.querySelector('.submit-btn');

    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (isValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        let formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData
        }).then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Message Sent!';
                document.getElementById("successMessage").style.display = "block";
                this.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    document.getElementById("successMessage").style.display = "none";
                }, 3000);
            } else {
                alert("There was an error sending your message. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }).catch(error => {
            alert("Something went wrong. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card, .skills-category').forEach(element => {
  observer.observe(element);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

document.querySelectorAll('.skill-tag').forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
});

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

window.addEventListener('load', () => {
  const loader = document.querySelector('.loading');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });


  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });
});