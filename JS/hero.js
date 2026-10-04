// Custom Cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .plot-card, .feature-card, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = '#E8D58A';
            ring.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
            ring.style.borderWidth = '2px';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = '#C9A84C';
            ring.style.backgroundColor = 'transparent';
            ring.style.borderWidth = '2px';
        });
    });
}