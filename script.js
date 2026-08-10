/* =========================================
   RASULOV — MOTION SYSTEM
========================================= */


/* =========================================
   NAVIGATION
========================================= */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -70px 0px"
  }
);


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================
   MAGNETIC BUTTONS
========================================= */

const magneticElements = document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

  element.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 900) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    element.style.transform =
      `translate(${x * 0.18}px, ${y * 0.18}px)`;

  });


  element.addEventListener("mouseleave", () => {

    element.style.transform = "";

  });

});


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


document.addEventListener("mousemove", (event) => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

  followerX +=
    (mouseX - followerX) * 0.12;

  followerY +=
    (mouseY - followerY) * 0.12;

  follower.style.left = `${followerX}px`;
  follower.style.top = `${followerY}px`;

  requestAnimationFrame(animateCursor);

}

animateCursor();


const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .service"
);


interactiveElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {
    follower.classList.add("active");
  });

  element.addEventListener("mouseleave", () => {
    follower.classList.remove("active");
  });

});


/* =========================================
   HERO PARALLAX
========================================= */

const heroOrb = document.querySelector(".hero-orb");

window.addEventListener("mousemove", (event) => {

  if (!heroOrb || window.innerWidth < 900) {
    return;
  }

  const x =
    (event.clientX / window.innerWidth - 0.5) * 30;

  const y =
    (event.clientY / window.innerHeight - 0.5) * 30;

  heroOrb.style.transform =
    `translate(${x}px, ${y}px)`;

});


/* =========================================
   HORIZONTAL PROJECT SCROLL
========================================= */

const horizontalSection =
  document.querySelector(".projects-section");

const horizontalTrack =
  document.querySelector(".horizontal-track");


function updateHorizontalScroll() {

  if (
    !horizontalSection ||
    !horizontalTrack ||
    window.innerWidth < 800
  ) {
    return;
  }


  const rect =
    horizontalSection.getBoundingClientRect();

  const sectionHeight =
    horizontalSection.offsetHeight;

  const viewportHeight =
    window.innerHeight;


  const start =
    viewportHeight - rect.top;

  const total =
    sectionHeight + viewportHeight;


  let progress =
    start / total;


  progress =
    Math.max(0, Math.min(1, progress));


  const maxMove =
    horizontalTrack.scrollWidth -
    window.innerWidth;


  const move =
    progress * maxMove;


  horizontalTrack.style.transform =
    `translate3d(${-move}px, 0, 0)`;

}


window.addEventListener(
  "scroll",
  updateHorizontalScroll,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateHorizontalScroll
);

updateHorizontalScroll();


/* =========================================
   PROJECT CARD PARALLAX
========================================= */

const projectCards =
  document.querySelectorAll(".project-card");


window.addEventListener(
  "scroll",
  () => {

    if (window.innerWidth < 800) {
      return;
    }

    projectCards.forEach((card) => {

      const rect =
        card.getBoundingClientRect();

      const center =
        window.innerWidth / 2;

      const cardCenter =
        rect.left + rect.width / 2;

      const distance =
        cardCenter - center;

      const rotate =
        Math.max(
          -3,
          Math.min(
            3,
            distance / 250
          )
        );

      card.style.rotate =
        `${rotate}deg`;

    });

  },
  { passive: true }
);


/* =========================================
   FAQ
========================================= */

const faqItems =
  document.querySelectorAll(".faq-item");


faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");


  question.addEventListener(
    "click",
    () => {

      const isActive =
        item.classList.contains("active");


      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        otherAnswer.style.maxHeight = null;

      });


      if (!isActive) {

        item.classList.add("active");

        answer.style.maxHeight =
          `${answer.scrollHeight}px`;

      }

    }
  );

});


/* =========================================
   SMOOTH ANCHOR
========================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);

    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================
   TEXT MOUSE TILT
========================================= */

const titles =
  document.querySelectorAll(
    ".hero-title, .contact-title"
  );


titles.forEach((title) => {

  title.addEventListener(
    "mousemove",
    (event) => {

      if (window.innerWidth < 900) {
        return;
      }

      const rect =
        title.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      title.style.transform =
        `perspective(1000px)
         rotateX(${y * -1.5}deg)
         rotateY(${x * 1.5}deg)`;

    }
  );


  title.addEventListener(
    "mouseleave",
    () => {

      title.style.transform = "";

    }
  );

});


/* =========================================
   SCROLL VELOCITY
========================================= */

let lastScroll =
  window.scrollY;

let scrollVelocity =
  0;


window.addEventListener(
  "scroll",
  () => {

    const currentScroll =
      window.scrollY;

    scrollVelocity =
      currentScroll -
      lastScroll;

    lastScroll =
      currentScroll;

  },
  { passive: true }
);


/* =========================================
   PROJECT VELOCITY EFFECT
========================================= */

window.addEventListener(
  "scroll",
  () => {

    if (window.innerWidth < 800) {
      return;
    }

    projectCards.forEach((card) => {

      const speed =
        Math.max(
          -8,
          Math.min(
            8,
            scrollVelocity * 0.15
          )
        );

      card.style.marginTop =
        `${speed}px`;

    });

  },
  { passive: true }
);


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "loaded"
    );

    document
      .querySelectorAll(".hero .reveal")
      .forEach((element, index) => {

        setTimeout(() => {

          element.classList.add(
            "visible"
          );

        }, 150 + index * 180);

      });

  }
);


/* =========================================
   IMAGE LAZY LOAD SUPPORT
========================================= */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.loading = "lazy";

  });


/* =========================================
   MOBILE HORIZONTAL PROJECTS
========================================= */

if (window.innerWidth < 800) {

  const track =
    document.querySelector(".horizontal-track");

  if (track) {

    track.style.transform =
      "none";

  }

}


/* =========================================
   CONSOLE
========================================= */

console.log(
  "%cRasulov — Web Developer",
  "font-size:20px;font-weight:bold;"
);

console.log(
  "Welcome to the code."
);