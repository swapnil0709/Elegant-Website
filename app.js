let controller;
let slideScene;

function animateSlides() {
  //init
  controller = new ScrollMagic.Controller();
  //selecting
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Looping
  sliders.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    // GSAP

    const animate = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    animate.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    animate.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    animate.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    animate.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
  });
}

animateSlides();
