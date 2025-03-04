// Анимация появления при скролле
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.animate');
            if (content) {
                content.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));