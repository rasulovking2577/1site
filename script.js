const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");


// HEADER

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}, { passive: true });


// MOBILE MENU

menuBtn.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");

});


// CLOSE MOBILE MENU

mobileMenu.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

  });

});


// REVEAL ANIMATION

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

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


document
  .querySelectorAll(
    ".service-card, .project-card, .process-step, .advantage, .problem-item"
  )
  .forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

  });


// SMOOTH ANCHOR FALLBACK

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const id = link.getAttribute("href");

    if (id === "#") return;

    const target = document.querySelector(id);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});