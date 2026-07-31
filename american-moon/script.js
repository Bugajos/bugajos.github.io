const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 300);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
const images = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');

        observer.unobserve(img);
    });
});

images.forEach(img => observer.observe(img));
