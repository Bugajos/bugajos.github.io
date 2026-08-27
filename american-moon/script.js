const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 300);
});

function scrollToTop(event) {
    if (event) event.preventDefault();
    
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
const images = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const img = entry.target;
            const src = img.dataset.src;

            img.src = src;
            img.removeAttribute('data-src');

            observer.unobserve(img);
        });
    },
    {
        rootMargin: '300px 0px',
        threshold: 0
    }
);

images.forEach(img => observer.observe(img));
