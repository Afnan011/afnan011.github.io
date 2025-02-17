const themeToggle = document.getElementById('theme-toggle');

themeToggle.checked = localStorage.getItem('theme') !== 'dark-mode';

themeToggle.addEventListener('change', () => {
  if (!themeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('theme');
  }
});

if (localStorage.getItem('theme') === 'dark-mode') {
  document.body.classList.add('dark-mode');
  themeToggle.checked = false;
}
  

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
    const loader = document.querySelector('.loading');

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
        loader.style.display = 'flex';
        loader.style.background = 'transparent';

        let formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData
        }).then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Message Sent!';
                loader.style.display = 'none';
                document.getElementById("successMessage").style.display = "block";
                this.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    loader.style.display = 'none';
                    document.getElementById("successMessage").style.display = "none";
                }, 3000);
            } else {
                alert("There was an error sending your message. Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                loader.style.display = 'none';
            }
        }).catch(error => {
            alert("Something went wrong. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            loader.style.display = 'none';
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
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.classList.add('fas', 'fa-arrow-up');
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