/* ==========================================
   RASULOV — PREMIUM PORTFOLIO
   Lightweight animation system
========================================== */


/* ==========================================
   LOADER
========================================== */

document.body.classList.add("loading");

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    if (loader) {
      loader.classList.add("hide");
    }

    document.body.classList.remove("loading");

  }, 700);

});


/* ==========================================
   ELEMENTS
========================================== */

const progress = document.getElementById("progress");
const projectsTrack = document.getElementById("projectsTrack");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");


/* ==========================================
   SCROLL PROGRESS
========================================== */

function updateProgress() {

  const scrollTop = window.scrollY;

  const pageHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (pageHeight <= 0) return;

  const percentage =
    (scrollTop / pageHeight) * 100;

  progress.style.width = percentage + "%";
}

window.addEventListener(
  "scroll",
  updateProgress,
  { passive: true }
);


/* ==========================================
   REVEAL ANIMATIONS
========================================== */

const revealElements =
  document.querySelectorAll(".reveal");

const observer =
  new IntersectionObserver(
    (entries, obs) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        obs.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );


revealElements.forEach(element => {
  observer.observe(element);
});


/* ==========================================
   MOBILE MENU
========================================== */

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

  });

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

      });

    });

}


/* ==========================================
   HORIZONTAL PROJECT SCROLL
========================================== */

let targetX = 0;
let currentX = 0;

let horizontalEnabled = false;

function checkHorizontalMode() {

  horizontalEnabled =
    window.innerWidth > 800;

}

checkHorizontalMode();

window.addEventListener(
  "resize",
  checkHorizontalMode
);


/*
   Desktop:
   вертикальный скролл превращается
   в движение проекта слева направо.

   Используем requestAnimationFrame,
   чтобы не дёргать DOM на каждый scroll.
*/

function updateHorizontalProjects() {

  if (!horizontalEnabled || !projectsTrack) {

    requestAnimationFrame(updateHorizontalProjects);
    return;

  }

  const work =
    document.querySelector(".work");

  if (!work) {

    requestAnimationFrame(updateHorizontalProjects);
    return;

  }

  const rect =
    work.getBoundingClientRect();

  const viewportHeight =
    window.innerHeight;

  const workHeight =
    work.offsetHeight;

  const start =
    -rect.top;

  const maxScroll =
    Math.max(
      1,
      workHeight - viewportHeight
    );

  let progressValue =
    start / maxScroll;

  progressValue =
    Math.max(
      0,
      Math.min(
        1,
        progressValue
      )
    );

  const trackWidth =
    projectsTrack.scrollWidth;

  const available =
    Math.max(
      0,
      trackWidth - window.innerWidth
    );

  targetX =
    progressValue * available;

  /*
     плавное приближение
  */

  currentX +=
    (targetX - currentX) * 0.08;

  projectsTrack.style.transform =
    `translate3d(${-currentX}px, 0, 0)`;

  requestAnimationFrame(
    updateHorizontalProjects
  );
}

requestAnimationFrame(
  updateHorizontalProjects
);


/* ==========================================
   TOUCH HORIZONTAL PROJECTS
========================================== */

if (projectsTrack) {

  let touchStartX = 0;
  let touchCurrentX = 0;

  projectsTrack.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.touches[0].clientX;

    },
    { passive: true }
  );

  projectsTrack.addEventListener(
    "touchmove",
    event => {

      touchCurrentX =
        event.touches[0].clientX;

    },
    { passive: true }
  );

}


/* ==========================================
   MAGNETIC BUTTONS
========================================== */

const magneticElements =
  document.querySelectorAll(".magnetic");

if (window.matchMedia("(hover:hover)").matches) {

  magneticElements.forEach(element => {

    element.addEventListener(
      "mousemove",
      event => {

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

      }
    );

    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform =
          "";

      }
    );

  });

}


/* ==========================================
   CUSTOM CURSOR
========================================== */

const cursorDot =
  document.querySelector(".cursor-dot");

const cursorRing =
  document.querySelector(".cursor-ring");

if (
  cursorDot &&
  cursorRing &&
  window.matchMedia("(hover:hover)").matches
) {

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  window.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      cursorDot.style.left =
        mouseX + "px";

      cursorDot.style.top =
        mouseY + "px";

    }
  );

  function animateCursor() {

    ringX +=
      (mouseX - ringX) * 0.15;

    ringY +=
      (mouseY - ringY) * 0.15;

    cursorRing.style.left =
      ringX + "px";

    cursorRing.style.top =
      ringY + "px";

    requestAnimationFrame(
      animateCursor
    );
  }

  animateCursor();


  document
    .querySelectorAll(
      "a, button, .project-card, .skill-card"
    )
    .forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursorRing.classList.add(
            "active"
          );

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          cursorRing.classList.remove(
            "active"
          );

        }
      );

    });

}


/* ==========================================
   PROJECT CARD TILT
========================================== */

if (
  window.matchMedia("(hover:hover)").matches
) {

  document
    .querySelectorAll(".project-card")
    .forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateY =
            ((x - centerX) /
              centerX) * 2;

          const rotateX =
            -((y - centerY) /
              centerY) * 2;

          card.style.transform =
            `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            `;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

}


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".header nav a"
  );

const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting)
          return;

        navLinks.forEach(link => {

          link.classList.remove(
            "active"
          );

        });

        const active =
          document.querySelector(
            `.header nav a[href="#${entry.target.id}"]`
          );

        if (active) {

          active.classList.add(
            "active"
          );

        }

      });

    },
    {
      threshold: 0.4
    }
  );

sections.forEach(section => {

  sectionObserver.observe(section);

});


/* ==========================================
   SMOOTH ANCHOR OFFSET
========================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        if (
          !id ||
          id === "#"
        ) return;

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        const offset = 70;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


/* ==========================================
   PARALLAX ORB
========================================== */

const orb =
  document.querySelector(".hero-orb");

let orbTick = false;

window.addEventListener(
  "scroll",
  () => {

    if (orbTick) return;

    orbTick = true;

    requestAnimationFrame(() => {

      const y =
        window.scrollY * 0.12;

      if (orb) {

        orb.style.transform =
          `translate3d(0, ${y}px, 0)`;

      }

      orbTick = false;

    });

  },
  { passive: true }
);


/* ==========================================
   KEYBOARD
========================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      if (mobileMenu) {
        mobileMenu.classList.remove(
          "open"
        );
      }

    }

  }
);


/* ==========================================
   INITIAL
========================================== */

updateProgress();