const initApp = () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuNav = document.querySelectorAll("#mobile-menu-nav a");

    const toggleMenu = () => {
        mobileMenu.classList.toggle('mobile-menu-open');
        mobileMenuNav.forEach(link => {
            link.classList.toggle("opacity-0");
            link.classList.toggle("opacity-100");
        });
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    mobileMenu.addEventListener('click', toggleMenu);

    document.addEventListener('scroll', function () {
        var navbar = document.getElementById('navbar');
        var scrollY = window.scrollY;

        if (scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);