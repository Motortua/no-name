// script.js — interaksi balon dengan CONFIG untuk kustomisasi
const CONFIG = {
  greeting: 'Selamat Ulang Tahun!',
  names: 'Alvensia · Rinda · Mirella',
  additionalMessage: '22 tahun? Wow, kamu makin keren! Semoga tahun ini penuh fun, love, dan zero drama. Cheers to you!',
  musicFile: 'music.mp3',
  popFile: 'pop.mp3',
  // base float duration (seconds); individual balloons get small offsets
  floatDurationBase: 6,
  // auto reveal after N seconds if user doesn't click (set to 0 to disable)
  autoRevealAfter: 20,
  // balloon colors (will override CSS colors if provided)
  balloonColors: ['#ff6b6b', '#ffd166', '#6bc1ff', '#b58cff', 'linear-gradient(180deg,#ff7ab6,#ffd166)', 'linear-gradient(180deg,#6bc1ff,#8ce0c9)'],
  // text size base (font size in px)
  textFontSize: 70,
  // scale amplitude for text pulsing
  scaleAmplitude: 0.1
};

const balloons = document.querySelectorAll('.balloon');
const message = document.getElementById('message');
const greetingEl = document.getElementById('greeting');
const namesEl = document.getElementById('names');
// additional message inside slide 2
const additionalEl = document.getElementById('additionalSlide');
const instructionEl = document.getElementById('instruction');
const confettiContainer = document.getElementById('confetti-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bgAudio = document.getElementById('bgAudio');
const popAudio = document.getElementById('popAudio');
const resetBtn = document.getElementById('resetBtn');
let revealed = false;
let autoRevealTimer = null;
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Apply CONFIG to DOM
function applyConfig() {
  // Text
  if (greetingEl) greetingEl.textContent = CONFIG.greeting;
  if (namesEl) namesEl.textContent = CONFIG.names;
  if (additionalEl) additionalEl.textContent = CONFIG.additionalMessage;

  // Audio sources
  if (bgAudio && CONFIG.musicFile) bgAudio.src = CONFIG.musicFile;
  if (popAudio && CONFIG.popFile) popAudio.src = CONFIG.popFile;

  // Balloon colors and float durations
  balloons.forEach((b, i) => {
    const color = CONFIG.balloonColors[i] || null;
    if (color) {
      b.style.background = color;
    }
    // give each balloon a slightly different float duration
    const dur = CONFIG.floatDurationBase + (i * 0.4);
    b.style.animationDuration = dur + 's';
    // optionally vary sizes using CSS var
    if (CONFIG.sizes && CONFIG.sizes[i]) {
      b.style.setProperty('--size', CONFIG.sizes[i] + 'px');
    }
  });

  // expose config for debugging / live edit in console
  window.UC_CONFIG = CONFIG;
}

function revealMessage() {
  if (revealed) return;
  revealed = true;
  // make sure the message opens on the second slide (index 1)
  showSlide(1);
  message.classList.remove('hidden');
  if (bgAudio) bgAudio.play().catch((e) => console.log('Audio play error:', e));
  // cancel auto reveal timer if running
  if (autoRevealTimer) { clearTimeout(autoRevealTimer); autoRevealTimer = null; }
}

// Create confetti particles
function createConfetti() {
  const colors = ['#ff6b6b', '#ffd166', '#6bc1ff', '#b58cff', '#ff7ab6', '#8ce0c9'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomX = (Math.random() - 0.5) * 400;
    const randomDelay = Math.random() * 0.3;
    
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.background = randomColor;
    confetti.style.setProperty('--tx', randomX + 'px');
    confetti.style.animationDelay = randomDelay + 's';
    confetti.style.width = (5 + Math.random() * 8) + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation completes
    setTimeout(() => { confetti.remove(); }, 3300 + randomDelay * 1000);
  }
}

// Slide carousel functions
function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
  currentSlide = n;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function popBalloon(el) {
  if (revealed) return; // setelah reveal, ignore clicks
  if (popAudio) popAudio.play().catch(()=>{});
  el.classList.add('popped');
  createConfetti(); // spawn confetti
  // hide instruction when balloon is clicked
  if (instructionEl) instructionEl.style.display = 'none';
  // delay show to let pop animation play
  setTimeout(()=>{
    revealMessage();
  }, 420);
}

applyConfig();

// start auto-reveal timer if configured
if (CONFIG.autoRevealAfter && CONFIG.autoRevealAfter > 0) {
  autoRevealTimer = setTimeout(()=>{
    revealMessage();
  }, CONFIG.autoRevealAfter * 1000);
}

balloons.forEach(b => {
  b.addEventListener('click', ()=> popBalloon(b));
  b.addEventListener('touchstart', (ev)=>{ ev.preventDefault(); popBalloon(b); }, {passive:false});
});

resetBtn.addEventListener('click', ()=>{
  revealed = false;
  message.classList.add('hidden');
  balloons.forEach(b => b.classList.remove('popped'));
  if (bgAudio) { bgAudio.pause(); bgAudio.currentTime = 0; }
  // restore instruction
  if (instructionEl) instructionEl.style.display = 'block';
  // reset slide
  showSlide(0);
  // restart auto-reveal timer
  if (CONFIG.autoRevealAfter && CONFIG.autoRevealAfter > 0) {
    if (autoRevealTimer) clearTimeout(autoRevealTimer);
    autoRevealTimer = setTimeout(()=>{ revealMessage(); }, CONFIG.autoRevealAfter * 1000);
  }
});

// Slide button listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// keyboard accessibility
balloons.forEach((b)=>{
  b.setAttribute('tabindex', '0');
  b.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      popBalloon(b);
    }
  });
});

// show hint immediately at the start
const hint = 'Klik balon untuk membuka pesan';
if (namesEl) namesEl.textContent = CONFIG.names;

// Optional: helper function to update config programmatically
window.updateGreetingConfig = function(newCfg){
  Object.assign(CONFIG, newCfg);
  applyConfig();
};