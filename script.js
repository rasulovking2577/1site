/* =====================================================
   1САЙТ — INTERACTION ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       LOADER
    ================================================= */

    const loader = document.querySelector(".loader");
    const loaderLine = document.querySelector(".loader-line span");
    const loaderPercent = document.querySelector(".loader-percent");

    let progress = 0;

    const loaderInterval = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 3;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loaderInterval);

            setTimeout(() => {
                loader.classList.add("hidden");
                document.body.classList.remove("loading");
            }, 450);
        }

        loaderLine.style.width = progress + "%";
        loaderPercent.textContent = progress + "%";

    }, 55);


    /* =================================================
       HEADER
    ================================================= */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");
        mobileMenu.classList.toggle("open");

        document.body.style.overflow =
            mobileMenu.classList.contains("open")
                ? "hidden"
                : "";

    });

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuButton.classList.remove("active");
            mobileMenu.classList.remove("open");
            document.body.style.overflow = "";

        });

    });


    /* =================================================
       REVEAL ANIMATIONS
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

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
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =================================================
       CURSOR
    ================================================= */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });

    function animateCursor() {

        followerX +=
            (mouseX - followerX) * 0.12;

        followerY +=
            (mouseY - followerY) * 0.12;

        follower.style.left =
            followerX + "px";

        follower.style.top =
            followerY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* =================================================
       CURSOR HOVER
    ================================================= */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .price-card, .service, .project-card"
        );

    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {
            follower.classList.add("active");
        });

        element.addEventListener("mouseleave", () => {
            follower.classList.remove("active");
        });

    });


    /* =================================================
       MAGNETIC BUTTONS
    ================================================= */

    const magneticElements =
        document.querySelectorAll(".magnetic");

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 800) {
                return;
            }

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
                `translate(${x * 0.15}px, ${y * 0.15}px)`;

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "translate(0, 0)";

        });

    });


    /* =================================================
       HORIZONTAL PROJECT SCROLL
    ================================================= */

    const projectsWrapper =
        document.querySelector(".projects-wrapper");

    const projectsTrack =
        document.querySelector(".projects-track");

    if (projectsWrapper && projectsTrack) {

        let currentX = 0;
        let targetX = 0;
        let maxX = 0;

        function calculateHorizontal() {

            if (window.innerWidth <= 600) {
                projectsTrack.style.transform =
                    "translateX(0)";
                return;
            }

            maxX =
                projectsTrack.scrollWidth -
                window.innerWidth;

            if (maxX < 0) {
                maxX = 0;
            }

        }

        calculateHorizontal();

        window.addEventListener(
            "resize",
            calculateHorizontal
        );


        function horizontalAnimation() {

            if (window.innerWidth > 600) {

                const rect =
                    projectsWrapper.getBoundingClientRect();

                const viewportHeight =
                    window.innerHeight;

                const progress =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            (viewportHeight - rect.top) /
                            (viewportHeight + rect.height)
                        )
                    );

                targetX =
                    progress * maxX;

                currentX +=
                    (targetX - currentX) * 0.08;

                projectsTrack.style.transform =
                    `translate3d(${-currentX}px,0,0)`;

            }

            requestAnimationFrame(
                horizontalAnimation
            );
        }

        horizontalAnimation();


        /* Mouse wheel → horizontal */

        projectsWrapper.addEventListener(
            "wheel",
            (event) => {

                if (
                    window.innerWidth <= 600
                ) {
                    return;
                }

                const rect =
                    projectsWrapper.getBoundingClientRect();

                const visible =
                    rect.top < window.innerHeight &&
                    rect.bottom > 0;

                if (!visible) {
                    return;
                }

                const canMove =
                    Math.abs(event.deltaY) >
                    Math.abs(event.deltaX);

                if (canMove) {

                    event.preventDefault();

                    targetX += event.deltaY;

                    targetX =
                        Math.max(
                            0,
                            Math.min(
                                maxX,
                                targetX
                            )
                        );

                }

            },
            {
                passive: false
            }
        );

    }


    /* =================================================
       PARALLAX HERO
    ================================================= */

    const heroTitle =
        document.querySelector(".hero-title");

    const glowOne =
        document.querySelector(".glow-one");

    const glowTwo =
        document.querySelector(".glow-two");

    window.addEventListener("scroll", () => {

        const scrollY =
            window.scrollY;

        if (heroTitle) {

            heroTitle.style.transform =
                `translateY(${scrollY * 0.12}px)`;

        }

        if (glowOne) {

            glowOne.style.transform =
                `translateY(${scrollY * 0.08}px)`;

        }

        if (glowTwo) {

            glowTwo.style.transform =
                `translateY(${-scrollY * 0.04}px)`;

        }

    }, {
        passive: true
    });


    /* =================================================
       3D PROJECT TILT
    ================================================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 900) {
                    return;
                }

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
                    (y - centerY) /
                    centerY *
                    -2;

                const rotateY =
                    (x - centerX) /
                    centerX *
                    2;

                card.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1200px) rotateX(0) rotateY(0)";

            }
        );

    });


    /* =================================================
       SERVICE HOVER
    ================================================= */

    const services =
        document.querySelectorAll(".service");

    services.forEach(service => {

        service.addEventListener(
            "mouseenter",
            () => {

                services.forEach(other => {

                    if (other !== service) {
                        other.style.opacity = ".35";
                    }

                });

            }
        );

        service.addEventListener(
            "mouseleave",
            () => {

                services.forEach(other => {
                    other.style.opacity = "1";
                });

            }
        );

    });


    /* =================================================
       PROCESS ACTIVE ITEM
    ================================================= */

    const processItems =
        document.querySelectorAll(
            ".process-item"
        );

    const processObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        processItems.forEach(item => {
                            item.style.opacity =
                                item === entry.target
                                    ? "1"
                                    : ".45";
                        });

                    }

                });

            },
            {
                threshold: .6
            }
        );

    processItems.forEach(item => {
        processObserver.observe(item);
    });


    /* =================================================
       SMOOTH ANCHOR
    ================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =================================================
       BUTTON RIPPLE
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".contact-button, .price-button, .header-button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,.15)";

                ripple.style.left =
                    (event.clientX - rect.left - size / 2) + "px";

                ripple.style.top =
                    (event.clientY - rect.top - size / 2) + "px";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.transform =
                    "scale(0)";

                ripple.style.transition =
                    "transform .7s ease, opacity .7s ease";

                button.style.position =
                    "relative";

                button.style.overflow =
                    "hidden";

                button.appendChild(ripple);

                requestAnimationFrame(() => {

                    ripple.style.transform =
                        "scale(2)";

                    ripple.style.opacity =
                        "0";

                });

                setTimeout(() => {
                    ripple.remove();
                }, 750);

            }
        );

    });


    /* =================================================
       ACTIVE NAV
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav a"
        );

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute(
                                    "href"
                                ) === "#" + id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: .35
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =================================================
       KEYBOARD PROJECT CONTROL
    ================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                window.innerWidth <= 600
            ) {
                return;
            }

            if (
                event.key !== "ArrowRight" &&
                event.key !== "ArrowLeft"
            ) {
                return;
            }

            const wrapper =
                document.querySelector(
                    ".projects-wrapper"
                );

            if (!wrapper) {
                return;
            }

            const amount = 500;

            if (event.key === "ArrowRight") {
                wrapper.scrollBy({
                    left: amount,
                    behavior: "smooth"
                });
            }

            if (event.key === "ArrowLeft") {
                wrapper.scrollBy({
                    left: -amount,
                    behavior: "smooth"
                });
            }

        }
    );


    /* =================================================
       IMAGE-LIKE MOVEMENT FOR PROJECTS
    ================================================= */

    document.querySelectorAll(
        ".project-image"
    ).forEach(image => {

        image.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    image.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width;

                const y =
                    (event.clientY - rect.top) /
                    rect.height;

                const moveX =
                    (x - .5) * 15;

                const moveY =
                    (y - .5) * 15;

                const inner =
                    image.children[0];

                if (inner) {

                    inner.style.transform =
                        `translate(${moveX}px,${moveY}px)`;

                }

            }
        );

        image.addEventListener(
            "mouseleave",
            () => {

                const inner =
                    image.children[0];

                if (inner) {

                    inner.style.transform =
                        "translate(0,0)";

                }

            }
        );

    });


    /* =================================================
       PERFORMANCE SAFETY
    ================================================= */

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {
                        ticking = false;
                    }
                );

                ticking = true;
            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       CONSOLE BRAND
    ================================================= */

    console.log(
        "%c1САЙТ",
        "font-size:40px;font-weight:900;"
    );

    console.log(
        "%cСайты, которые запоминают.",
        "font-size:14px;color:#777;"
    );

});