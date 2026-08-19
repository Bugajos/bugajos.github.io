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

    const MY_DOMAIN = 'bugajos.github.io';

    function fixExternalLinks() {
        document.querySelectorAll('a[href]').forEach(function (link) {
            const href = link.getAttribute('href');

            if (!href ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href.startsWith('javascript:')) {
                return;
            }

            try {
                const url = new URL(href, location.href);

                if (!url.hostname.endsWith('.translate.goog')) return;

                let host = url.hostname.replace(/\.translate\.goog$/, '');

                host = host.replace(/--/g, '§');
                host = host.replace(/-/g, '.');
                host = host.replace(/§/g, '-');

                if (host === MY_DOMAIN) return;

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
                ].forEach(function (param) {
                    url.searchParams.delete(param);
                });

                link.href = url.href;

            } catch (e) {}
        });
    }

    fixExternalLinks();

    new MutationObserver(fixExternalLinks).observe(
        document.documentElement,
        {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['href']
        }
    );
})();
