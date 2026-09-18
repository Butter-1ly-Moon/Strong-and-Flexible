(async function loadSharedHeader() {
    const currentHeader = document.querySelector('header');
    if (!currentHeader) return;

    try {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error(`Header request failed: ${response.status}`);

        const markup = await response.text();
        const template = document.createElement('template');
        template.innerHTML = markup.trim();
        const sharedHeader = template.content.firstElementChild;
        if (!sharedHeader) throw new Error('Shared header markup is empty');

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        sharedHeader.querySelectorAll('[data-nav-link]').forEach((link) => {
            if (link.dataset.navLink === currentPage) {
                link.classList.add('text-white', 'font-bold');
                link.setAttribute('aria-current', 'page');
                link.classList.remove('text-slate-300');
            }
        });

        if (currentPage === 'services.html' || currentPage === 'movement-assessment.html' || currentPage === 'one-to-one-sessions.html') {
            const servicesButton = sharedHeader.querySelector('[data-services-button]');
            servicesButton?.classList.add('text-white', 'font-bold');
            servicesButton?.classList.remove('text-slate-300');
        }

        currentHeader.replaceWith(sharedHeader);
        window.Alpine?.initTree(sharedHeader);
    } catch (error) {
        console.warn('Shared header could not be loaded. Keeping the page header.', error);
    }
})();
