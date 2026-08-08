(() => {

  "use strict";


  /* =========================
     HEADER
  ========================= */

  const header = document.getElementById("header");

  function updateHeader(){

    if(window.scrollY > 40){
      header.classList.add("scrolled");
    }else{
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateHeader, {
    passive:true
  });

  updateHeader();


  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function toggleMenu(){

    const open = mobileMenu.classList.toggle("open");

    menuBtn.classList.toggle("active", open);

    document.body.classList.toggle("menu-open", open);

  }

  menuBtn.addEventListener("click", toggleMenu);


  mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("open");
      menuBtn.classList.remove("active");
      document.body.classList.remove("menu-open");

    });

  });


  document.addEventListener("keydown", event => {

    if(event.key === "Escape"){

      mobileMenu.classList.remove("open");
      menuBtn.classList.remove("active");
      document.body.classList.remove("menu-open");

    }

  });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },

      {
        threshold:.12,
        rootMargin:"0px 0px -50px 0px"
      }

    );


  revealElements.forEach(element => {

    observer.observe(element);

  });


  /* =========================
     CURSOR GLOW
  ========================= */

  const glow =
    document.querySelector(".cursor-glow");

  const supportsHover =
    window.matchMedia("(hover:hover)").matches;

  if(supportsHover){

    document.addEventListener("mousemove", event => {

      glow.style.left = event.clientX + "px";
      glow.style.top = event.clientY + "px";
      glow.style.opacity = "1";

    });

  }


  /* =========================
     SMOOTH ANCHORS
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if(targetId === "#") return;

      const target =
        document.querySelector(targetId);

      if(!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

    });

  });


  /* =========================
     FAQ
  ========================= */

  const faqItems =
    document.querySelectorAll(".faq");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if(!item.open) return;

      faqItems.forEach(other => {

        if(other !== item){
          other.removeAttribute("open");
        }

      });

    });

  });


  /* =========================
     MOUSE TILT
  ========================= */

  if(supportsHover){

    const browser =
      document.querySelector(".browser");

    if(browser){

      browser.addEventListener("mousemove", event => {

        const rect =
          browser.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateY =
          (x - .5) * 5;

        const rotateX =
          (.5 - y) * 4;

        browser.style.transform =
          `perspective(1000px)
           rotateY(${rotateY}deg)
           rotateX(${rotateX}deg)
           translateY(-5px)`;

      });

      browser.addEventListener("mouseleave", () => {

        browser.style.transform =
          "perspective(1000px) rotateY(-4deg) rotateX(2deg)";

      });

    }

  }


  /* =========================
     ACTIVE NAV
  ========================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if(!entry.isIntersecting) return;

          navLinks.forEach(link => {

            link.classList.remove("active");

            if(
              link.getAttribute("href") ===
              "#" + entry.target.id
            ){

              link.classList.add("active");

            }

          });

        });

      },

      {
        threshold:.25
      }

    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });


  /* =========================
     BUTTON RIPPLE
  ========================= */

  document.querySelectorAll(".btn, .contact-main").forEach(button => {

    button.addEventListener("click", event => {

      const ripple =
        document.createElement("span");

      ripple.style.position = "absolute";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,.35)";
      ripple.style.pointerEvents = "none";
      ripple.style.left =
        event.offsetX + "px";
      ripple.style.top =
        event.offsetY + "px";
      ripple.style.transform =
        "translate(-50%,-50%) scale(1)";
      ripple.style.opacity = "1";
      ripple.style.transition =
        "transform .5s, opacity .5s";

      if(
        getComputedStyle(button).position ===
        "static"
      ){

        button.style.position = "relative";

      }

      button.style.overflow = "hidden";

      button.appendChild(ripple);

      requestAnimationFrame(() => {

        ripple.style.transform =
          "translate(-50%,-50%) scale(25)";

        ripple.style.opacity = "0";

      });

      setTimeout(() => {

        ripple.remove();

      },550);

    });

  });


  /* =========================
     PARALLAX ORBS
  ========================= */

  if(supportsHover){

    window.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - .5);

      const y =
        (event.clientY / window.innerHeight - .5);

      document.querySelectorAll(".hero-orb").forEach(
        (orb,index) => {

          const speed =
            index === 0 ? 18 : -12;

          orb.style.transform =
            `translate(${x * speed}px,${y * speed}px)`;

        }
      );

    });

  }


  /* =========================
     YEAR
  ========================= */

  const year =
    document.querySelector("footer");

  if(year){

    year.innerHTML =
      year.innerHTML.replace(
        "© 2026",
        "© " + new Date().getFullYear()
      );

  }


  /* =========================
     PAGE LOADED
  ========================= */

  window.addEventListener("load", () => {

    document.body.classList.add("loaded");

  });


})();