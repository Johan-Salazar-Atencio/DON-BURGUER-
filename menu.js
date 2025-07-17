document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const dateTimeElement = document.getElementById('currentDateTime');
    const floatingCart = document.getElementById('floatingCart');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const viewCartButton = document.getElementById('viewCartButton'); // Referencia al nuevo botón "Ver Carrito"
    const cartItemCount = document.getElementById('cartItemCount'); // Referencia al span del contador
    const orderButtons = document.querySelectorAll('.order-button'); // Botones de "Añadir al Carrito"

    // Cargar el carrito desde localStorage o inicializarlo vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Función para Actualizar Fecha y Hora en la Navbar ---
    function updateDateTime() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
        const year = now.getFullYear();
        const dateString = `${day}/${month}/${year}`;

        dateTimeElement.textContent = `${dateString} ${timeString}`;
    }

    updateDateTime(); // Actualiza inmediatamente al cargar la página
    setInterval(updateDateTime, 1000); // Actualiza cada segundo

    // --- Funcionalidad del Carrito ---

    // Renderizar los ítems del carrito en la interfaz y actualizar el contador del botón
    function renderCart() {
        cartItemsList.innerHTML = ''; // Limpia la lista actual del carrito
        let total = 0;
        let itemCount = 0; // Contador de la cantidad total de ítems

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-cart-message">El carrito está vacío.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">Cantidad: ${item.quantity}</span>
                    </div>
                    <span class="item-price">S/${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-name="${item.name}">&times;</button>
                `;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
                itemCount += item.quantity; // Sumar la cantidad de cada item para el contador
            });
        }
        cartTotalElement.textContent = total.toFixed(2); // Actualiza el total
        cartItemCount.textContent = itemCount; // Actualiza el contador en el botón "Ver Carrito"

        // Guardar el estado actual del carrito en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mostrar u ocultar el botón "Ver Carrito" basado en si hay ítems en el carrito
        if (itemCount > 0) {
            viewCartButton.style.display = 'flex'; // Usar 'flex' para que el icono y el texto se alineen
        } else {
            viewCartButton.style.display = 'none';
            hideCart(); // Ocultar el carrito flotante si se vacía por completo
        }
    }

    // Añadir un producto al carrito
    orderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.menu-card'); // Encuentra la tarjeta del producto
            const name = card.dataset.name; // Obtiene el nombre del data-attribute
            const price = parseFloat(card.dataset.price); // Obtiene el precio
            const image = card.dataset.image; // Obtiene la ruta de la imagen

            const existingItem = cart.find(item => item.name === name); // Busca si el item ya existe

            if (existingItem) {
                // Si el item ya existe, incrementa su cantidad
                existingItem.quantity++;
            } else {
                // Si es un item nuevo, lo añade al carrito
                cart.push({ name, price, image, quantity: 1 });
            }
            
            renderCart(); // Vuelve a renderizar el carrito para mostrar los cambios
            animateCartButton(); // Animar el botón "Ver Carrito"
            
            // Opcional: Animar el carrito flotante si ya está visible
            if (floatingCart.classList.contains('active')) {
                floatingCart.classList.add('recepting');
                setTimeout(() => {
                    floatingCart.classList.remove('recepting');
                }, 500);
            }
        });
    });

    // Remover un producto (o reducir su cantidad) del carrito
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const nameToRemove = event.target.dataset.name;
            const itemIndex = cart.findIndex(item => item.name === nameToRemove);

            if (itemIndex > -1) {
                cart[itemIndex].quantity--; // Reduce la cantidad
                if (cart[itemIndex].quantity <= 0) {
                    // Si la cantidad llega a 0 o menos, elimina el item del carrito
                    cart.splice(itemIndex, 1);
                }
            }
            renderCart(); // Vuelve a renderizar el carrito
            // La visibilidad del botón "Ver Carrito" y el carrito flotante se maneja en renderCart()
        }
    });

    // Mostrar el carrito flotante
    function showCart() {
        floatingCart.classList.add('active');
    }

    // Ocultar el carrito flotante
    function hideCart() {
        floatingCart.classList.remove('active');
    }

    // Evento click para el nuevo botón "Ver Carrito"
    viewCartButton.addEventListener('click', () => {
        // Alternar la visibilidad del carrito flotante
        if (floatingCart.classList.contains('active')) {
            hideCart();
        } else {
            showCart();
        }
    });

    // Evento click para el botón de cerrar (la 'x') dentro del carrito flotante
    cartCloseBtn.addEventListener('click', hideCart);

    // Animación para el nuevo botón "Ver Carrito" cuando se añade un item
    function animateCartButton() {
        viewCartButton.classList.add('recepting-nav-cart');
        setTimeout(() => {
            viewCartButton.classList.remove('recepting-nav-cart');
        }, 500); // Duración de la animación
    }

    renderCart(); // Llama a renderCart al cargar la página para inicializar el carrito y el contador
});