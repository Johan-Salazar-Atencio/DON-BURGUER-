document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const formFields = [
        { id: 'nombres', messageId: 'error-nombres', validation: value => value.trim() !== '', error: 'Los nombres son obligatorios.' },
        { id: 'apellidos', messageId: 'error-apellidos', validation: value => value.trim() !== '', error: 'Los apellidos son obligatorios.' },
        { id: 'dni', messageId: 'error-dni', validation: value => /^\d{8}$/.test(value), error: 'El DNI debe tener 8 dígitos numéricos.' },
        { id: 'celular', messageId: 'error-celular', validation: value => /^\d{9}$/.test(value), error: 'El número celular debe tener 9 dígitos numéricos.' },
        { id: 'email', messageId: 'error-email', validation: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: 'Ingrese un correo electrónico válido.' },
        { id: 'password', messageId: 'error-password', validation: value => value.length >= 6, error: 'La contraseña debe tener al menos 6 caracteres.' }
    ];
    const aceptarPolitica = document.getElementById('aceptarPolitica');
    const errorPolitica = document.getElementById('error-politica');
    const registroContainer = document.querySelector('.registro-container');

    const successModal = document.getElementById('successModal');
    const closeModalButton = document.getElementById('closeModal');
    const confettiContainer = document.getElementById('confettiContainer');

    // --- Form Validation ---
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío predeterminado del formulario

        let isValid = true;

        formFields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorMessageDiv = document.getElementById(field.messageId);
            if (!field.validation(input.value)) {
                errorMessageDiv.textContent = field.error;
                isValid = false;
            } else {
                errorMessageDiv.textContent = '';
            }
        });

        // Validación específica para el checkbox de política
        if (!aceptarPolitica.checked) {
            errorPolitica.textContent = 'Debe aceptar la Política de Privacidad y Términos y Condiciones.';
            isValid = false;
        } else {
            errorPolitica.textContent = '';
        }

        if (isValid) {
            showSuccessModal();
            registroForm.reset(); // Reinicia el formulario después del envío exitoso
        }
    });

    // Añade retroalimentación de validación en tiempo real al escribir/salir del campo
    formFields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorMessageDiv = document.getElementById(field.messageId);
        input.addEventListener('input', () => {
            if (field.validation(input.value)) {
                errorMessageDiv.textContent = '';
            }
        });
        input.addEventListener('blur', () => {
             if (!field.validation(input.value)) {
                errorMessageDiv.textContent = field.error;
            }
        });
    });

    aceptarPolitica.addEventListener('change', () => {
        if (aceptarPolitica.checked) {
            errorPolitica.textContent = '';
        }
    });

    // --- Círculos en Movimiento ---
    const circleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#FF9F1C']; // Rojo, Turquesa, Azul, Dorado, Naranja
    const numberOfCircles = 10;
    const minSize = 30;
    const maxSize = 80;

    function createCircle() {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        const size = Math.random() * (maxSize - minSize) + minSize;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Posición inicial aleatoria
        const posX = Math.random() * (window.innerWidth - size);
        const posY = Math.random() * (window.innerHeight - size);
        circle.style.left = `${posX}px`;
        circle.style.top = `${posY}px`;

        // Color aleatorio
        const color = circleColors[Math.floor(Math.random() * circleColors.length)];
        circle.style.setProperty('--circle-color-light', color + 'CC'); // Añade algo de transparencia
        circle.style.setProperty('--circle-color-dark', color + '80');

        // Propiedades de movimiento aleatorias (para la animación CSS)
        const dx1 = (Math.random() - 0.5) * 300;
        const dy1 = (Math.random() - 0.5) * 300;
        const dx2 = (Math.random() - 0.5) * 300;
        const dy2 = (Math.random() - 0.5) * 300;
        const dx3 = (Math.random() - 0.5) * 300;
        const dy3 = (Math.random() - 0.5) * 300;
        const duration = Math.random() * 20 + 10; // 10-30 segundos

        circle.style.setProperty('--dx1', `${dx1}px`);
        circle.style.setProperty('--dy1', `${dy1}px`);
        circle.style.setProperty('--dx2', `${dx2}px`);
        circle.style.setProperty('--dy2', `${dy2}px`);
        circle.style.setProperty('--dx3', `${dx3}px`);
        circle.style.setProperty('--dy3', `${dy3}px`);
        circle.style.animation = `moveCircle ${duration}s infinite alternate ease-in-out`;

        registroContainer.prepend(circle); // Añade al contenedor detrás del formulario

        circle.addEventListener('click', () => {
            circle.classList.add('circle--burst');
            setTimeout(() => {
                circle.remove(); // Elimina después de la animación
                // Si quieres que aparezcan dos más, descomenta las siguientes líneas:
                // createCircle();
                // createCircle();
            }, 500); // Coincide con la duración de la transición CSS
        });
    }

    // Creación inicial de círculos
    for (let i = 0; i < numberOfCircles; i++) {
        createCircle();
    }

    // --- Modal de Éxito con Confeti ---
    const confettiColors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#a9def9', '#b5e2fa', '#c0e8fa', '#cbeffd', '#d6f5fc', '#e1f8fd'];

    function showSuccessModal() {
        successModal.classList.add('active');
        launchConfetti();
    }

    function hideSuccessModal() {
        successModal.classList.remove('active');
        clearConfetti();
    }

    closeModalButton.addEventListener('click', hideSuccessModal);

    // Opcional: Cerrar modal haciendo clic fuera (si el overlay no tiene confetti)
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });

    function launchConfetti() {
        confettiContainer.innerHTML = ''; // Limpiar confeti anterior
        const numConfetti = 100;
        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.setProperty('--confetti-color', color);

            const startX = Math.random() * 100 + '%';
            const startY = Math.random() * -20 + '%'; // Empieza por encima de la pantalla
            const endX = (Math.random() - 0.5) * 500 + 'px'; // Caer a los lados
            const endY = window.innerHeight + 50 + 'px'; // Caer fuera de la pantalla
            const duration = Math.random() * 2 + 1.5; // 1.5 - 3.5 segundos

            confetti.style.left = startX;
            confetti.style.top = startY;
            confetti.style.setProperty('--duration', `${duration}s`);
            confetti.style.setProperty('--endX', endX);
            confetti.style.setProperty('--endY', endY);

            confettiContainer.appendChild(confetti);
        }
    }

    function clearConfetti() {
        // Detener y eliminar el confeti después de que el modal se cierre
        const allConfetti = confettiContainer.querySelectorAll('.confetti');
        allConfetti.forEach(c => c.remove());
    }
});