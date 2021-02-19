let controller;
let slideScene;
let pageScene;
function animateSlides() {
  //init
  controller = new ScrollMagic.Controller();
  //selecting
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Looping
  sliders.forEach((slide, index, slides) => {
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

    // create a scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(animate)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);

    const pageAnimate = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageAnimate.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageAnimate.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );
    pageAnimate.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })

      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageAnimate)
      .addTo(controller);
  });
}

animateSlides();
