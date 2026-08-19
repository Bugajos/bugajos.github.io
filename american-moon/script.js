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

(function () {
    if (!location.hostname.endsWith('.translate.goog')) return;

    function restoreOriginalUrl(href) {
        try {
            const url = new URL(href, location.href);

            if (!url.hostname.endsWith('.translate.goog')) {
                return null;
            }

            let host = url.hostname.replace(/\.translate\.goog$/, '');

            host = host.replace(/--/g, '\x00');
            host = host.replace(/-/g, '.');
            host = host.replace(/\x00/g, '-');

            url.hostname = host;

            [
                '_x_tr_sl',
                '_x_tr_tl',
                '_x_tr_hl',
                '_x_tr_pto',
                '_x_tr_hist',
                '_x_tr_enc',
                '_x_tr_sch',
                '_x_tr_orig'
            ].forEach(param => {
                url.searchParams.delete(param);
            });

            return url.href;
        } catch {
            return null;
        }
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href]');

        if (!link) return;

        const originalUrl = restoreOriginalUrl(link.href);

        if (!originalUrl) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        window.location.assign(originalUrl);
    }, true);
})();
