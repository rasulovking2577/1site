/* =========================
   TYPING EFFECT
========================= */

const typingElement = document.getElementById("typing");

const words = [
    "Web Developer",
    "Frontend Developer",
    "Code Learner",
    "Future Developer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    const speed = deleting ? 50 : 90;

    setTimeout(typeEffect, speed);
}


typeEffect();



/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


menuButton.addEventListener("click", function () {

    nav.classList.toggle("active");

});


const navLinks =
    document.querySelectorAll(".nav a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});



/* =========================
   THEME SWITCHER
========================= */

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light");


    if (document.body.classList.contains("light")) {

        themeButton.textContent = "☾";

    } else {

        themeButton.textContent = "☀";

    }

});



/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});



/* =========================
   SKILL BARS
========================= */

const skillProgress =
    document.querySelectorAll(".skill-progress");


const skillObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const progress =
                        entry.target;

                    const width =
                        progress.dataset.width;

                    progress.style.width = width;

                    skillObserver.unobserve(progress);

                }

            });

        },

        {
            threshold: 0.5
        }

    );


skillProgress.forEach(function (bar) {

    skillObserver.observe(bar);

});



/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener(
    "mousemove",
    function (event) {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);



/* =========================
   PROJECT CARD TILT
========================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 25;

            const rotateY =
                (centerX - x) / 25;


            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform = "";

        }
    );

});



/* =========================
   HEADER SCROLL
========================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(8, 8, 8, 0.94)";

        } else {

            header.style.background =
                "rgba(8, 8, 8, 0.78)";

        }

    }
);



/* =========================
   PARTICLES
========================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



document.addEventListener(
    "mousemove",
    function (event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);



class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 1.5 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.3;

        this.speedY =
            (Math.random() - 0.5) * 0.3;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (this.x < 0 ||
            this.x > canvas.width) {

            this.speedX *= -1;

        }


        if (this.y < 0 ||
            this.y > canvas.height) {

            this.speedY *= -1;

        }


        if (mouse.x !== null) {

            const dx =
                this.x - mouse.x;

            const dy =
                this.y - mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const force =
                    (120 - distance) / 120;

                this.x +=
                    (dx / distance) *
                    force *
                    0.5;

                this.y +=
                    (dy / distance) *
                    force *
                    0.5;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(229, 9, 20, 0.35)";

        ctx.fill();

    }

}



function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
            ? 35
            : 70;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


window.addEventListener(
    "resize",
    createParticles
);



function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (particle) {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();