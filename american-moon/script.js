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

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.createElement("div");
    lightbox.id = "imageLightbox";

    lightbox.innerHTML = `
        <span class="close" aria-label="Close">&times;</span>
        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".close");

    document.querySelectorAll("img[data-src]").forEach(img => {

        img.addEventListener("click", () => {

            const src = img.getAttribute("src") || img.getAttribute("data-src");

            if (!src) return;

            lightboxImg.src = src;
            lightboxImg.alt = img.alt || "";

            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
        });

    });

    function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.style.overflow = "";
        lightboxImg.src = "";
    }

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });

});

const savedMode = localStorage.getItem("darkMode");

if (savedMode === "enabled") {
    document.body.classList.add("dark");
}


document.addEventListener("click", (e) => {
    const button = e.target.closest("#darkToggle");

    if (!button) return;


    button.classList.remove("flip");
    void button.offsetWidth;
    button.classList.add("flip");


    const isDark = document.body.classList.toggle("dark");


    localStorage.setItem(
        "darkMode",
        isDark ? "enabled" : "disabled"
    );


    button.textContent = isDark ? "🔆" : "🌙";
});
