// ===== HERO BACKGROUND SLIDER (Sliding Carousel) =====
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (slides.length === 0) return;

    const len = slides.length;
    let current = 0;
    let interval = null;
    let animating = false;
    const AUTO_DURATION = 6000;
    const TRANSITION_MS = 800;

    function goTo(index) {
        if (animating) return;
        if (index < 0) index = len - 1;
        if (index >= len) index = 0;
        if (index === current) return;

        animating = true;

        // Outgoing slide slides out to the left
        slides[current].classList.remove('hero-slide-active');
        slides[current].classList.add('hero-slide-prev');

        // Incoming slide slides in from the right (base position is +100%)
        slides[index].classList.add('hero-slide-active');

        dots[current].classList.remove('hero-dot-active');
        dots[index].classList.add('hero-dot-active');

        current = index;

        setTimeout(() => {
            slides[current].classList.remove('hero-slide-prev');
            animating = false;
        }, TRANSITION_MS);
    }

    function next() {
        goTo(current + 1);
    }

    function startAuto() {
        stopAuto();
        interval = setInterval(next, AUTO_DURATION);
    }

    function stopAuto() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.slide, 10));
            startAuto();
        });
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopAuto);
        slide.addEventListener('mouseleave', startAuto);
    });

    startAuto();
})();
