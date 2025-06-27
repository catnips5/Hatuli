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

/* ---------- 4. אנימציית “POP” (הגדלה קלה) ---------- */
function popCycle(){
  logo.classList.add('pop');
  logo.addEventListener('animationend', ()=>{
    logo.classList.remove('pop');
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
  logo.classList.add('flash');
  logo.addEventListener('animationend', ()=>{
    logo.classList.remove('flash');
  }, { once:true });
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
  if(scrollTop > 200){
    backTop.classList.add('show');
  }else{
    backTop.classList.remove('show');
  }
});

/* ---------- Theme Toggle ---------- */
const toggleBtn = document.getElementById('theme-toggle');
const backTop   = document.getElementById('back-to-top');
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}
toggleBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

backTop.addEventListener('click', ()=>{
  window.scrollTo({ top:0, behavior:'smooth' });
});
