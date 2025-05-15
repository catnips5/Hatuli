/* כיווץ לוגו בעת גלילה */
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('shrink', window.scrollY > 60);
});

/* חשיפת אלמנטים ב-fade-in */
const observer = new IntersectionObserver(
  (entries) => {
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
