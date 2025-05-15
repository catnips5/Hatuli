/* script.js – כיווץ לוגו בעת גלילה + חשיפת אלמנטים */

/* 1. כיווץ הלוגו */
function toggleHeaderShrink() {
  document.body.classList.toggle('scrolled', window.scrollY > 60);
}

// מריצים פעם אחת בטעינת הדף + בכל גלילה
toggleHeaderShrink();
window.addEventListener('scroll', toggleHeaderShrink);

/* 2. Fade-in לאלמנטים עם .reveal  */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
