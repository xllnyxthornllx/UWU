// =========================================
// Inicialización y Música Local
// =========================================
// El audio intentará reproducir el archivo local "musica.mp3"
const bgMusic = document.getElementById('bg-music');
if(bgMusic) bgMusic.volume = 0.5;

function startExperience() {
    if (bgMusic) {
        bgMusic.play().catch(error => {
            console.log("Si la música no suena, asegúrate de tener un archivo llamado 'musica.mp3' en la misma carpeta.");
        });
    }
    
    nextScreen(1);
    setTimeout(startTypewriter, 800);
}

// =========================================
// Transiciones de Pantalla
// =========================================
function nextScreen(currentScreenId) {
    const currentScreen = document.getElementById(`screen${currentScreenId}`);
    const nextScreen = document.getElementById(`screen${currentScreenId + 1}`);

    if (currentScreen && nextScreen) {
        currentScreen.classList.remove('active');
        currentScreen.classList.add('hidden');
        
        setTimeout(() => {
            nextScreen.classList.remove('hidden');
            nextScreen.classList.add('active');
        }, 600);
    }
}

// =========================================
// Efecto Máquina de Escribir (Poema)
// =========================================
const poemText = `Desde que llegaste, todo cambió...
Mi mundo entero se iluminó de rosa. 🌸

Haces honor a tu nombre, mi dulce Luz,
porque mi vida brilla muchísimo más si estás tú.

Cada sonrisa tuya me derrite,
y cada momento a tu lado, es perfecto.`;

const typewriterElement = document.getElementById('typewriter-text');
const btnNextPoem = document.getElementById('btn-next-poem');
let i = 0;

function startTypewriter() {
    if (i < poemText.length) {
        typewriterElement.innerHTML += poemText.charAt(i);
        i++;
        
        let speed = Math.random() * 50 + 30; 
        
        if (poemText.charAt(i-1) === ',' || poemText.charAt(i-1) === '.') {
            speed = 400;
        }
        if (poemText.charAt(i-1) === '\n') {
            speed = 600;
        }

        setTimeout(startTypewriter, speed);
    } else {
        setTimeout(() => {
            btnNextPoem.classList.remove('hidden');
        }, 500);
    }
}

// =========================================
// Lógica del botón "No" que se escapa
// =========================================
const btnNo = document.getElementById('btnNo');

function moveBtnNo() {
    btnNo.style.position = 'absolute';
    
    // El contenedor padre debe ser relativo
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;
    
    // Límites dentro de la tarjeta / pantalla
    const maxX = containerRect.width - btnWidth;
    // Para que no se vaya muy lejos hacia abajo o arriba
    const maxY = 150; 
    
    const randomX = Math.random() * maxX;
    // Permitimos que se mueva hacia arriba o abajo en un rango seguro
    const randomY = (Math.random() * maxY) - (maxY / 2); 
    
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseover', moveBtnNo);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveBtnNo();
});
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveBtnNo();
});

// =========================================
// Lógica de Celebración (Cuando dice "Sí")
// =========================================
function sayYes() {
    nextScreen(4);
    lanzarConfetiRosa();
    // Lanza muchos corazones de golpe
    for(let i=0; i<30; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function lanzarConfetiRosa() {
    var duration = 5000;
    var end = Date.now() + duration;

    // Colores rosas, fucsias y blancos
    var colors = ['#ffc0cb', '#ff69b4', '#ff1493', '#ffffff', '#d81b60'];

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: colors
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// =========================================
// Fondo de Corazones Flotantes
// =========================================
const heartsContainer = document.getElementById('hearts-bg');
const emojis = ['❤️', '💖', '🌸', '✨', '💕'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart-anim');
    
    // Emoji aleatorio
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Tamaño aleatorio
    const size = Math.random() * 2 + 1; 
    heart.style.fontSize = `${size}rem`;
    
    // Posición X aleatoria
    heart.style.left = `${Math.random() * 100}vw`;
    
    // Duración de la animación aleatoria
    const duration = Math.random() * 8 + 7; 
    heart.style.animationDuration = `${duration}s`;
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generar corazones iniciales
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, Math.random() * 2000);
}

// Continuar generando corazones suavemente
setInterval(createHeart, 800);