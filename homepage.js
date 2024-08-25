// Firebase configuration
const firebaseConfig = {
    // Add your Firebase configuration here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Slider functionality
const sliderContent = [
    { type: 'video', src: 'aayuv_heartbeat.mp4' },
    { type: 'image', src: 'aayuv_logo.png' },
    { type: 'image', src: 'p2.png' },
    // Add more slides as needed
];

let currentSlide = 0;

function createSlider() {
    const sliderElement = document.getElementById('slider');
    sliderContent.forEach((slide, index) => {
        const slideElement = document.createElement(slide.type === 'image' ? 'img' : 'video');
        slideElement.src = slide.src;
        slideElement.classList.add('slide');
        if (index === 0) slideElement.classList.add('active');
        if (slide.type === 'video') {
            slideElement.muted = true;
            slideElement.loop = true;
            slideElement.autoplay = true;
        }
        sliderElement.appendChild(slideElement);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createSlider();
    setInterval(nextSlide, 5000);
});
