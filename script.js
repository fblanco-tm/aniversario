// --- API DE YOUTUBE PARA AUDIO DE FONDO ---
let player;

// Esta función la llama automáticamente YouTube cuando carga su librería
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio-container', {
        height: '0',
        width: '0',
        videoId: 'MTwrIg6ET1k', // El ID de tu video
        playerVars: {
            'autoplay': 0, 
            'loop': 1,
            'playlist': 'MTwrIg6ET1k'
        },
        events: {
            'onReady': (event) => {
                // El reproductor ya está cargado y listo
                console.log("Reproductor listo");
            }
        }
    });
}

// Cargar la librería de la API de YouTube de forma asíncrona
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Transición de la vista de inicio a la sección principal
function startExperience() {
    document.getElementById('welcome-view').classList.remove('active');
    document.getElementById('main-view').classList.add('active');
    updateCounter(); // Calcular el tiempo transcurrido al entrar

    // Reproducir el audio justo cuando el usuario hace clic en "Iniciar"
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        // Forzar volumen al máximo por seguridad
        if (player.setVolume) {
            player.setVolume(100);
        }
    } else {
        // Por si acaso la API tardó un segundo más en conectar con GitHub Pages
        setTimeout(() => {
            if (player && typeof player.playVideo === 'function') {
                player.playVideo();
                if (player.setVolume) {
                    player.setVolume(100);
                }
            }
        }, 1000);
    }
}

// --- LÓGICA DEL CARRUSEL DE FOTOS ---
let currentIndex = 0;
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = 3;

function updateCarousel() {
    if (!track) return;
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
}, 4000);

// --- LÓGICA DE LA CARTA ---
function openLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letterContent');
    
    envelope.classList.add('open');
    setTimeout(() => {
        letterContent.style.display = 'block';
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// --- LÓGICA DE LLUVIA DE CORAZONES (Duración exacta de 2 segundos) ---
function triggerHeartRain() {
    const duration = 2000; 
    const animationInterval = 100; 
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
    
    heart.style.left = Math.random() * 100 + 'vw';
    
    const fallDuration = Math.random() * 0.8 + 1;
    heart.style.animationDuration = fallDuration + 's';
    
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}

// --- LÓGICA DEL CONTADOR DE TIEMPO ---
function updateCounter() {
    const startDate = new Date(2023, 8, 28); // 28 de septiembre de 2023
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

    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');

    if (yearsEl) yearsEl.innerText = years;
    if (monthsEl) monthsEl.innerText = months;
    if (daysEl) daysEl.innerText = days;
}
