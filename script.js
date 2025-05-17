/* script.js – כיווץ כותרת, חשיפה, והחלפת לוגו אקראית */

/* 1. כיווץ החלק העליון בזמן גלילה */
function toggleHeaderShrink() {
  document.body.classList.toggle('scrolled', window.scrollY > 60);
}
toggleHeaderShrink();
window.addEventListener('scroll', toggleHeaderShrink);

/* 2. Fade-in לאלמנטים עם ‎.reveal */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold:0.2 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* 3. החלפת לוגו אקראית כל 25 שניות */
(() => {
  const logo   = document.getElementById('site-logo');
  const files  = ['clipped 2.png', 'clipped 2 - Copy.png'];
  let current  = 0;                       // מניח שהדף מתחיל עם clipped 2.png

  setInterval(() => {
    let next;
    do {
      next = Math.floor(Math.random() * files.length); // 0 או 1
    } while (next === current);         // שלא יחזור על אותו קובץ ברצף
    current   = next;
    logo.src  = files[current];
  }, 25_000); // 25,000 ms = 25 s
})();
