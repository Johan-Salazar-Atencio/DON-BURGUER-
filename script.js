document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let current = 0, playing = true;
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const showSlide = i => {
    slides[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
  };

  const nextSlide = () => showSlide(current + 1);
  const prevSlide = () => showSlide(current - 1);

  let interval = setInterval(nextSlide, 4000);

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  };

  // Scroll suave a secciones
  window.scrollToSection = id => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
});

// Menú responsivo
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("nav-list").classList.toggle("open");
});

// Mostrar fecha actual en footer
document.addEventListener("DOMContentLoaded", () => {
  const fecha = new Date();
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  const fechaFormateada = fecha.toLocaleDateString("es-PE", opciones);
  document.getElementById("fecha-actual").textContent = `Fecha actual: ${fechaFormateada}`;
});

