// === CONFIGURATION ===
const targetDate = new Date("January 1, 2026 00:00:00").getTime();
const targetDate2027 = new Date("January 1, 2027 00:00:00").getTime();
const siteURL = "https://bhargavaalapati.github.io/improved-octo-fiesta/";
const creatorName = "Alapati Bhargava Rama"; 

// 🕵️ Feature 3: SECRET RESET
// Usage: Add ?reset=true to your URL to clear storage and test again.
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
    localStorage.removeItem('2026_fortune_claimed');
    // Clean the URL so the user can use the app normally after reset
    window.history.replaceState({}, document.title, window.location.pathname);
}

// DOM Elements
const countdownContainer = document.getElementById('countdown-container');
const fortuneContainer = document.getElementById('fortune-container');
const revealBtn = document.getElementById('reveal-btn');
const fortuneText = document.getElementById('fortune-text');
const shareSection = document.getElementById('share-section');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
const timer2027 = document.getElementById('timer-2027');
const popSound = document.getElementById('pop-sound');

// Button Listeners
document.getElementById('reveal-btn').addEventListener('click', revealDestiny);
document.getElementById('btn-linkedin').addEventListener('click', () => copyToClipboard('linkedin'));
document.getElementById('btn-instagram').addEventListener('click', () => copyToClipboard('instagram'));
document.getElementById('btn-facebook').addEventListener('click', () => copyToClipboard('facebook'));

const fortunes = [
    "2026 is your year of high reward. Go get it. 🚀",
    "Your vibe attracts your tribe. Expect new connections. 🤝",
    "Big risks, bigger wins. Be brave this year. 🦁",
    "Clear your mind, the path is already there. 🧘",
    "You're going to be so proud of yourself by December. 🏆",
    "Focus on progress, not perfection. 🌱",
    "Financial growth is in your cards. 💰",
    "Love and laughter will find you in unexpected places. ❤️",
    "Code, Sleep, Repeat? No. Code, Create, Dominate. 💻",
    "The project you're scared to start? Start it now. 🔥",
    "Your energy is currency. Spend it wisely. ⚡",
    "Main Character Energy only in 2026. ✨",
    "Consistency is your superpower this year. 🗝️",
    "A surprise opportunity is coming sooner than you think. 🎁",
    "Protect your peace. It's expensive. 🛡️",
    "You are exactly where you need to be to level up. 📈",
    "Don't look back, you're not going that way. ➡️",
    "Kindness will open doors that intelligence cannot. 🚪",
    "Upgrade your skills, upgrade your life. 📚",
    "Stop waiting for the 'right time'. It's today. ⏰",
    "Your code will compile on the first try... occasionally. 😉",
    "Simplicity is the ultimate sophistication. Keep it clean. 🎨",
    "Drink more water. Debug with a clear head. 💧",
    "Travel is in your future. Pack your bags. ✈️",
    "This is the year you finally master that one hard skill. 🧠",
    "Luck is what happens when preparation meets opportunity. 🍀",
    "Believe in your sauce. You got this. 🍝",
    "Say 'Yes' to new adventures. 🗺️",
    "Your potential is loading... 100% Complete. 🔋",
    "Make it happen. Shock everyone. ⚡"
];

function updateState() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const savedFortune = localStorage.getItem('2026_fortune_claimed');

    // Logic for Main 2026 Countdown
    if (distance > 0) {
        countdownContainer.classList.remove('hidden');
        fortuneContainer.classList.add('hidden');
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    } else {
        countdownContainer.classList.add('hidden');
        fortuneContainer.classList.remove('hidden');
        
        if (savedFortune) {
            showLockedState(savedFortune);
        } else {
            revealBtn.classList.remove('hidden');
        }
    }

    // Logic for 2027 Countdown
    const distance2027 = targetDate2027 - now;
    const d27 = Math.floor(distance2027 / (1000 * 60 * 60 * 24));
    const h27 = Math.floor((distance2027 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m27 = Math.floor((distance2027 % (1000 * 60 * 60)) / (1000 * 60));
    
    timer2027.innerText = `${d27}d ${h27}h ${m27}m`;
}

function revealDestiny() {
    const randomMsg = fortunes[Math.floor(Math.random() * fortunes.length)];
    localStorage.setItem('2026_fortune_claimed', randomMsg);
    
    // 🔊 Feature 1: Play Sound
    popSound.play().catch(e => console.log("Audio autoplay prevented"));

    fortuneText.classList.remove('animate__fadeIn');
    fortuneText.classList.add('animate__fadeOut');

    setTimeout(() => {
        fortuneText.innerText = randomMsg;
        fortuneText.classList.remove('animate__fadeOut');
        fortuneText.classList.add('animate__fadeInUp');
        
        var end = Date.now() + (2 * 1000);
        var colors = ['#ffffff', '#a78bfa', '#fbbf24'];

        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());

        showLockedState(randomMsg);
    }, 500);
}

function showLockedState(msg) {
    fortuneText.innerText = msg;
    revealBtn.classList.add('hidden'); 
    shareSection.classList.remove('hidden');

    const shareText = `🔮 *My 2026 Destiny:* "${msg}"\n\n👨‍💻 Built by ${creatorName} x Gemini\n\nTap to reveal yours:`;
    const encodedText = encodeURIComponent(shareText);
    const encodedURL = encodeURIComponent(siteURL);

    // WhatsApp Link
    document.getElementById('btn-wa').href = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedURL}`;

    // 📅 Feature 2: Generate Google Calendar Link
    // Date format: YYYYMMDDTHHMMSSZ
    const calTitle = encodeURIComponent("✨ 2026 Fortune Check-in");
    const calDetails = encodeURIComponent(`In the first moments of 2026, my fortune was: "${msg}"\n\nDid I make it happen?`);
    const calDates = "20261231T120000Z/20261231T130000Z"; // Dec 31, 2026 12:00 PM UTC
    
    const calendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&dates=${calDates}`;
    document.getElementById('calendar-btn').href = calendarURL;
}

function copyToClipboard(platform) {
    const msg = fortuneText.innerText;
    const cleanText = `🔮 My 2026 Destiny: "${msg}"\n\n👨‍💻 Built by ${creatorName} x Gemini\n\nCheck yours: ${siteURL}`;
    
    navigator.clipboard.writeText(cleanText).then(() => {
        toastMsg.innerText = `Copied! Opening ${platform}...`;
        toast.classList.add('toast-enter');
        
        setTimeout(() => {
            toast.classList.remove('toast-enter');
            
            if (platform === 'instagram') window.location.href = "https://instagram.com";
            else if (platform === 'facebook') window.location.href = "https://facebook.com";
            else if (platform === 'linkedin') window.location.href = "https://linkedin.com";
        }, 2000);
    });
}

setInterval(updateState, 1000);
updateState();