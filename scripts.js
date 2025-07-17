function verMapa(url) {
    window.open(url, '_blank');
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.local').forEach(card => {
    observer.observe(card);
  });
  
  // Estrellas interactivas
  document.querySelectorAll('.estrella').forEach((estrella, index) => {
    estrella.addEventListener('click', () => {
      document.querySelectorAll('.estrella').forEach((e, i) => {
        e.classList.toggle('active', i <= index);
      });
    });
  });
  
  // Botón subir
  document.querySelector('.subir-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Gráfico
  const ctx = document.getElementById('graficoLocales').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lima Centro', 'San Isidro', 'Pueblo Libre', 'Miraflores', 'Jesús María'],
      datasets: [{
        label: 'Ventas (en miles)',
        data: [120, 100, 85, 70, 65],
        backgroundColor: ['#f17747', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c'],
        borderRadius: 10
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // ScrollReveal
  ScrollReveal().reveal('.local', { distance: '30px', duration: 800, easing: 'ease-out', origin: 'bottom', interval: 150 });
  ScrollReveal().reveal('.chef, .evento, .grafico-container', { distance: '20px', duration: 1000, easing: 'ease-in-out', interval: 200 });
  
  // Partículas
  particlesJS('particles-js', {
    particles: {
      number: { value: 40 },
      color: { value: "#f17747" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" }
      }
    }
  });