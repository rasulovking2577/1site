/* =========================
   1САЙТ — INTERACTIONS
========================= */


/* CURSOR GLOW */

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {

    if (!cursorGlow) return;

    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;

});


/* MOBILE MENU */

const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

    });

});


/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* MAGNETIC BUTTONS */

const magneticElements =
    document.querySelectorAll(".magnetic");

if (window.matchMedia("(hover:hover)").matches) {

    magneticElements.forEach((element) => {

        element.addEventListener("mousemove", (event) => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "translate(0, 0)";

        });

    });

}


/* FAQ */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const button =
        item.querySelector("button");

    button.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        faqItems.forEach((otherItem) => {

            otherItem.classList.remove("active");

        });


        if (!isActive) {

            item.classList.add("active");

        }

    });

});


/* WHATSAPP FORM */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        alert("Заполните все поля.");

        return;

    }


    const text =
        `Здравствуйте! Меня зовут ${name}.

Телефон: ${phone}

Мне нужен сайт:
${message}`;


    const whatsappURL =
        `https://wa.me/79696656414?text=${encodeURIComponent(text)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

});


/* SMOOTH ANCHOR OFFSET */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId.length < 2
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) return;


        event.preventDefault();


        const headerOffset = 90;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* ACTIVE NAV */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".desktop-nav a");


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.style.color =
                            "rgba(255,255,255,.65)";

                    });


                    const active =
                        document.querySelector(
                            `.desktop-nav a[href="#${entry.target.id}"]`
                        );


                    if (active) {

                        active.style.color =
                            "#ffffff";

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});


/* 3D PROJECT EFFECT */

const projectCards =
    document.querySelectorAll(".project");


if (window.matchMedia("(hover:hover)").matches) {

    projectCards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const rotateX =
                (0.5 - y) * 3;

            const rotateY =
                (x - 0.5) * 3;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

}


/* HERO PARALLAX */

const heroGrid =
    document.querySelector(".hero-grid");


window.addEventListener("scroll", () => {

    if (!heroGrid) return;

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroGrid.style.transform =
            `translateY(${scroll * 0.12}px)`;

    }

});


/* CONTACT BUTTON MICRO FEEDBACK */

const submitButton =
    document.querySelector(".submit-button");


contactForm.addEventListener("submit", () => {

    submitButton.querySelector("span").textContent =
        "Открываю WhatsApp…";

});


/* CURRENT YEAR */

document.querySelectorAll(".footer").forEach(footer => {

    const year =
        footer.querySelector(".current-year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});