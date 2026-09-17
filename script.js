// Transición de la vista de inicio a la sección principal
function startExperience() {
    document.getElementById('welcome-view').classList.remove('active');
    document.getElementById('main-view').classList.add('active');
    updateCounter(); // Calcular el tiempo transcurrido al entrar
}

// --- LÓGICA DEL CARRUSEL DE FOTOS ---
let currentIndex = 0;
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = 3;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function currentSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Cambio automático de fotos cada 4 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}, 3000);

// --- LÓGICA DE LA CARTA ---
function openLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letterContent');
    
    envelope.classList.add('open');
    setTimeout(() => {
        letterContent.style.display = 'block';
        // Hacer scroll suave hacia la carta desplegada
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// --- LÓGICA DE LLUVIA DE CORAZONES (Duración exacta de 2 segundos) ---
function triggerHeartRain() {
    const duration = 7000; // 7 segundos
    const animationInterval = 20; // Frecuencia de generación de corazones
    const endTime = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > endTime) {
            clearInterval(interval);
            return;
        }
        createHeart();
    }, animationInterval);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-rain');
    heart.innerHTML = ['❤️', '💖', '💕', '🤍', '✨'][Math.floor(Math.random() * 5)];
    
    // Posición horizontal aleatoria dentro de la pantalla
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Duración de caída aleatoria rápida (entre 1s y 1.8s)
    const fallDuration = Math.random() * 0.8 + 1;
    heart.style.animationDuration = fallDuration + 's';
    
    // Tamaño aleatorio
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';

    document.body.appendChild(heart);

    // Eliminar el elemento del DOM al terminar la animación
    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}

// --- LÓGICA DEL CONTADOR DE TIEMPO ---
function updateCounter() {
    // Fecha de inicio de noviazgo (28 de septiembre de 2023)
    const startDate = new Date(2009, 8, 28); // Mes 8 en JS es septiembre (0-indexed)
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Actualizar los elementos en el HTML
    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('days').innerText = days;
}
