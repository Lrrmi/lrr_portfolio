export function NavDrag(selector = '.navbar') {
    const slider = document.querySelector(selector);
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active'); // optional for styling while dragging
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    slider.scrollLeft = scrollLeft - walk;
    });
}

export function NavHide(selector = '.navbar') {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(selector);

    window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('hide');
    } else {
        // Scrolling up
        navbar.classList.remove('hide');
    }

    lastScrollY = window.scrollY;
    });
}

export function PadForNav(selector = '.navbar') {
    const navbar = document.querySelector(selector);
    const navbarHeight = navbar.offsetHeight;
    return navbarHeight;
}