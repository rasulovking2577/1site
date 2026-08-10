// Плавное появление элементов при прокрутке

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.12
    }
);


// Элементы для анимации

document
    .querySelectorAll(
        ".section, .skill-card, .project, .cta"
    )
    .forEach((element) => {

        element.classList.add("hidden");

        observer.observe(element);

    });


// Эффект движения карточки мышью

const card = document.querySelector(".developer-card");

if (card) {

    document.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 800) return;

        const x =
            (window.innerWidth / 2 - event.clientX) / 40;

        const y =
            (window.innerHeight / 2 - event.clientY) / 40;

        card.style.transform =
            `rotateY(${x}deg) rotateX(${y}deg)`;

    });

}


// Активная ссылка навигации

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


// Анимация чисел/статусов

const status = document.querySelector(".status");

if (status) {

    setInterval(() => {

        status.style.opacity = "0.65";

        setTimeout(() => {
            status.style.opacity = "1";
        }, 400);

    }, 2500);

}