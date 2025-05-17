/* ---------- 1. כיווץ כותרת בזמן גלילה ---------- */
function toggleHeaderShrink(){
  document.body.classList.toggle('scrolled', window.scrollY > 60);
}
toggleHeaderShrink();
window.addEventListener('scroll', toggleHeaderShrink);

/* ---------- 2. חשיפת אלמנטים עם ‎.reveal ---------- */
const observer = new IntersectionObserver(
  entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold:0.2 }
);
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* ---------- 3. מחזור לוגו: מקור → Copy (POP) → מקור ---------- */
(() => {
  const logo   = document.getElementById('site-logo');
  const SRC_A  = 'clipped 2.png';
  const SRC_B  = 'clipped 2 - Copy.png';

  function cycle(){
    /* מעבר מיידי ל-Copy + אפקט POP */
    logo.src = SRC_B;
    logo.classList.add('pop');

    /* חזרה אוטומטית למקור בסוף האנימציה (≈0.6 ש’) */
    logo.addEventListener('animationend', () => {
      logo.classList.remove('pop');
      logo.src = SRC_A;
    }, { once:true });
  }

  /* כל 25 שניות */
  setInterval(cycle, 25_000);
})();
