/* =================================
   1САЙТ
   MAIN JAVASCRIPT
================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =============================
       ELEMENTS
    ============================= */

    const body = document.body;

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    const progress = document.querySelector(".scroll-progress");

    const reveals = document.querySelectorAll(".reveal");

    const menuBtn = document.querySelector(".menu-btn");

    const faqItems = document.querySelectorAll(".faq-item");

    const counters = document.querySelectorAll("[data-counter]");

    const projectWrapper =
        document.querySelector(".projects-wrapper");

    const projects =
        document.querySelector(".projects");


    /* =============================
       CUSTOM CURSOR
    ============================= */

    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let followerX = mouseX;
        let followerY = mouseY;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";

        });


        function animateCursor() {

            followerX += (mouseX - followerX) * .12;
            followerY += (mouseY - followerY) * .12;

            follower.style.left = followerX + "px";
            follower.style.top = followerY + "px";

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactive =
            document.querySelectorAll(
                "a, button, .project-card, .service, .price-card"
            );

        interactive.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("active");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("active");
            });

        });

    }


    /* =============================
       SCROLL PROGRESS
    ============================= */

    function updateProgress() {

        const scrollTop = window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        progress.style.width = percent + "%";
    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* =============================
       REVEAL ON SCROLL
    ============================= */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    reveals.forEach(element => {
        revealObserver.observe(element);
    });


    /* =============================
       COUNTERS
    ============================= */

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const element = entry.target;

                    const target =
                        Number(element.dataset.counter);

                    let current = 0;

                    const duration = 1000;

                    const start =
                        performance.now();


                    function animateCounter(time) {

                        const progress =
                            Math.min(
                                (time - start) / duration,
                                1
                            );

                        const eased =
                            1 - Math.pow(1 - progress, 3);

                        current =
                            Math.floor(target * eased);

                        element.textContent =
                            current;

                        if (progress < 1) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            element.textContent =
                                target;
                        }
                    }


                    requestAnimationFrame(
                        animateCounter
                    );

                    counterObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: .7
            }
        );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =============================
       FAQ
    ============================= */

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            faqItems.forEach(other => {

                other.classList.remove("active");

                const otherAnswer =
                    other.querySelector(".faq-answer");

                otherAnswer.style.maxHeight = null;

            });


            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

        });

    });


    /* =============================
       HORIZONTAL PROJECT SCROLL
    ============================= */

    if (
        projectWrapper &&
        projects &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        projectWrapper.addEventListener(
            "wheel",
            (event) => {

                /*
                 * Если пользователь листает
                 * вертикально внутри проектов,
                 * превращаем это в горизонтальный scroll.
                 */

                if (Math.abs(event.deltaY) >
                    Math.abs(event.deltaX)) {

                    const maxScroll =
                        projects.scrollWidth -
                        projectWrapper.clientWidth;

                    const current =
                        projectWrapper.scrollLeft;

                    const next =
                        current + event.deltaY;


                    if (
                        next > 0 &&
                        next < maxScroll
                    ) {

                        event.preventDefault();

                        projectWrapper.scrollLeft =
                            next;
                    }

                }

            },
            {
                passive: false
            }
        );

    }


    /* =============================
       MOBILE MENU
    ============================= */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            body.classList.toggle("menu-open");

        });

    }


    /* =============================
       MAGNETIC BUTTONS
    ============================= */

    const magneticButtons =
        document.querySelectorAll(".magnetic");


    magneticButtons.forEach(button => {

        if (!window.matchMedia("(pointer:fine)").matches) {
            return;
        }


        button.addEventListener("mousemove", (e) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;


            button.style.transform =
                `translate(${x * .08}px, ${y * .08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =============================
       CARD TILT
    ============================= */

    const cards =
        document.querySelectorAll(
            ".price-card"
        );


    cards.forEach(card => {

        if (!window.matchMedia("(pointer:fine)").matches) {
            return;
        }


        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - .5) * -4;

            const rotateY =
                ((x / rect.width) - .5) * 4;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =============================
       SMOOTH ANCHOR
    ============================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", (e) => {

            const id =
                link.getAttribute("href");

            if (
                !id ||
                id === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(id);


            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =============================
       PARALLAX HERO
    ============================= */

    const heroContent =
        document.querySelector(".hero-content");


    if (
        heroContent &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        let ticking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;

                ticking = true;

                requestAnimationFrame(() => {

                    const y =
                        window.scrollY;

                    if (y < window.innerHeight) {

                        heroContent.style.transform =
                            `translateY(${y * .12}px)`;

                        heroContent.style.opacity =
                            Math.max(
                                0,
                                1 - y / 700
                            );

                    }

                    ticking = false;

                });

            },
            { passive: true }
        );

    }


    /* =============================
       PROJECT CARD PARALLAX
    ============================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        if (!window.matchMedia("(pointer:fine)").matches) {
            return;
        }


        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width - .5;

            const y =
                (e.clientY - rect.top) /
                rect.height - .5;


            const browser =
                card.querySelector(".fake-browser");


            if (browser) {

                browser.style.transform =
                    `perspective(1000px)
                     rotateX(${y * -5}deg)
                     rotateY(${x * 5}deg)`;

            }

        });


        card.addEventListener("mouseleave", () => {

            const browser =
                card.querySelector(".fake-browser");


            if (browser) {

                browser.style.transform =
                    "perspective(1000px) rotateX(8deg)";

            }

        });

    });


    /* =============================
       PERFORMANCE
    ============================= */

    /*
     * Не используем тяжёлые библиотеки.
     * Основные эффекты работают через CSS
     * и requestAnimationFrame.
     */

    console.log(
        "1САЙТ — system initialized."
    );

});