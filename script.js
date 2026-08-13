/* =========================
   LOADER
========================= */

const loader = document.querySelector(".loader");
const bar = document.querySelector(".loader-bar i");

let progress = 0;

const loaderTimer = setInterval(() => {

  progress += 5;

  bar.style.width = progress + "%";

  if (progress >= 100) {

    clearInterval(loaderTimer);

    setTimeout(() => {

      loader.classList.add("hide");

    }, 250);

  }

}, 35);



/* =========================
   HEADER
========================= */

const header = document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  },
  {
    passive: true
  }
);



/* =========================
   MOBILE MENU
========================= */

const menuButton =
  document.querySelector(".hamb");

const mobileMenu =
  document.querySelector(".mobile-menu");

menuButton?.addEventListener(
  "click",
  () => {

    const open =
      mobileMenu.classList.toggle("open");

    document.body.style.overflow =
      open ? "hidden" : "";

  }
);


mobileMenu
  ?.querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.remove("open");

        document.body.style.overflow = "";

      }
    );

  });



/* =========================
   HERO ORB
========================= */

const orb =
  document.querySelector(".hero-orb");

window.addEventListener(
  "pointermove",
  event => {

    if (!orb) return;

    if (
      !window.matchMedia(
        "(pointer:fine)"
      ).matches
    ) {
      return;
    }

    const x =
      (event.clientX - window.innerWidth / 2)
      / window.innerWidth;

    const y =
      (event.clientY - window.innerHeight / 2)
      / window.innerHeight;

    orb.style.transform =
      `
      translate(
        ${x * 45}px,
        ${y * 35}px
      )
      rotate(
        ${x * 12}deg
      )
      `;

  },
  {
    passive: true
  }
);



/* =========================
   PROJECT INTERACTION
========================= */

document
  .querySelectorAll(".project")
  .forEach(project => {

    project.addEventListener(
      "pointermove",
      event => {

        if (
          !window.matchMedia(
            "(pointer:fine)"
          ).matches
        ) {
          return;
        }

        const rect =
          project.getBoundingClientRect();

        const x =
          (event.clientX - rect.left)
          / rect.width
          - 0.5;

        const y =
          (event.clientY - rect.top)
          / rect.height
          - 0.5;

        const windowElement =
          project.querySelector(
            ".project-window"
          );

        if (windowElement) {

          windowElement.style.transform =
            `
            rotate(${x * 3}deg)
            translate(
              ${x * 8}px,
              ${y * 8}px
            )
            scale(1.02)
            `;

        }

      }
    );


    project.addEventListener(
      "pointerleave",
      () => {

        const windowElement =
          project.querySelector(
            ".project-window"
          );

        if (windowElement) {

          windowElement.style.transform = "";

        }

      }
    );

  });



/* =========================
   EASTER EGG BUTTON
========================= */

const secretButton =
  document.querySelector("#secret");

const easter =
  document.querySelector(".easter");

secretButton?.addEventListener(
  "click",
  () => {

    easter.classList.toggle(
      "secret-found"
    );

    if (
      easter.classList.contains(
        "secret-found"
      )
    ) {

      secretButton.innerHTML =
        "ты нашёл. но это не последняя. ↗";

    } else {

      secretButton.innerHTML =
        "найти пасхалку <b>→</b>";

    }

  }
);



/* =========================
   LOGO SECRET
========================= */

let logoClicks = 0;

const logo =
  document.querySelector(".logo");

logo?.addEventListener(
  "click",
  event => {

    logoClicks++;

    if (logoClicks === 7) {

      event.preventDefault();

      alert(
        "Пасхалка №1.\n\n1САЙТ заметил тебя 👀"
      );

      logoClicks = 0;

    }

  }
);



/* =========================
   KEYBOARD SECRET
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key.toLowerCase() === "x"
    ) {

      document.body.classList.toggle(
        "x-mode"
      );

    }

  }
);