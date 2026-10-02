(async function loadSharedFooter() {
    const currentFooter = document.querySelector('footer');
    if (!currentFooter) return;

    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error(`Footer request failed: ${response.status}`);

        const markup = await response.text();
        const template = document.createElement('template');
        template.innerHTML = markup.trim();
        const sharedFooter = template.content.firstElementChild;
        if (!sharedFooter) throw new Error('Shared footer markup is empty');

        const year = sharedFooter.querySelector('[data-current-year]');
        if (year) year.textContent = new Date().getFullYear();

        currentFooter.replaceWith(sharedFooter);
    } catch (error) {
        console.warn('Shared footer could not be loaded.', error);
    }
})();