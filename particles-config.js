particlesJS("particles-js", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#3b82f6"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.6,
      random: false
    },
    size: {
      value: 2,
      random: false
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: true
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

const updateParticlesColor = () => {
  const isDarkMode = document.body.classList.contains('dark-mode');
  const color = isDarkMode ? "#60a5fa" : "#3b82f6";
  
  if (window.pJSDom && window.pJSDom[0]) {
    window.pJSDom[0].pJS.particles.color.value = color;
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }
};

const particleThemeToggle = document.getElementById('theme-toggle');
particleThemeToggle.addEventListener('change', updateParticlesColor); 