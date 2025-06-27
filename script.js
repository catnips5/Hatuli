/* script.js */
/* ---------- 1. כותרת מתכווצת + מצב-התחלה גדול ---------- */
function handleScroll(){
  if(window.scrollY > 60){
    document.body.classList.add('scrolled');
    document.body.classList.remove('bigstart');
  }else{
    document.body.classList.remove('scrolled');
    document.body.classList.add('bigstart');
  }
}
document.body.classList.add('bigstart'); // התחלה ×2
handleScroll();
window.addEventListener('scroll', handleScroll);

/* ---------- 2. חשיפת ‎.reveal ---------- */
const obs = new IntersectionObserver(
  es => es.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
  }),
  { threshold:0.2 }
);
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ---------- 3. לוגו, נתיבים ---------- */
const logo   = document.getElementById('site-logo');
const SRC_A  = 'clipped 2.png';
const SRC_B  = 'clipped 2 - Copy.png';

/* ---------- 4. אנימציית “POP” (הגדלה קלה) ---------- */
function popCycle(){
  logo.src = SRC_B;
  logo.classList.add('pop');
  logo.addEventListener('animationend', ()=>{
    logo.classList.remove('pop');
    logo.src = SRC_A;
  }, { once:true });
}

/* ----- תזמון אקראי על בסיס 20 שניות ----- */
function schedulePop(){
  const multiplier = Math.ceil(Math.random()*4);        // 1–4
  const delay = 20_000 * multiplier;                    // 20 / 40 / 60 / 80 s
  setTimeout(()=>{ popCycle(); schedulePop(); }, delay);
}
schedulePop();

/* ---------- 5. הבזק מהיר 1-2-1 (1.3 s) ---------- */
function flashCycle(){
  logo.src = SRC_B;
  setTimeout(()=>{ logo.src = SRC_A; }, 650);           // חצי מ-1.3 s
}

/* ----- תזמון אקראי על בסיס 23 שניות ----- */
function scheduleFlash(){
  const multiplier = Math.ceil(Math.random()*4);        // 1–4
  const delay = 23_000 * multiplier;                    // 23 / 46 / 69 / 92 s
  setTimeout(()=>{ flashCycle(); scheduleFlash(); }, delay);
}
scheduleFlash();

/* ---------- 6. פס-התקדמות גלילה ---------- */
window.addEventListener('scroll', ()=>{
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = docHeight ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('scroll-progress').style.width = percentage + '%';
});

/* ---------- 7. מצב יום/לילה ---------- */
const toggleBtn = document.getElementById('theme-toggle');
function setTheme(isDark){
  document.body.classList.toggle('dark', isDark);
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
}

toggleBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark'){
  setTheme(true);
}
