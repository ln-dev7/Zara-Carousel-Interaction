import "./style.scss";
import gsap from "gsap";
import '@splidejs/splide/css';

import Splide from '@splidejs/splide';

var splide = new Splide('.splide', {
    type: 'loop',
    focus: 'center',
    perMove: 1,
    perPage: 3,
    gap: '1rem',
    pagination: false,
    drag: false,
});

splide.mount();

const cardre = document.querySelector(".cardre");
const slideActive1 = document.querySelector(".splide__slide.is-active");
cardre.style.width = slideActive1.offsetWidth + "px";
cardre.style.height = slideActive1.offsetHeight + "px";

const arrowNext = document.querySelector(".splide__arrow--next");
const arrowPrev = document.querySelector(".splide__arrow--prev");

arrowNext.addEventListener("click", () => {
    gsap.fromTo(
        ".splide, .cardre",
        {x: 100},
        {x: 0, duration: 2.5, ease: "elastic.out(1.5,1)"}
    );
});
arrowPrev.addEventListener("click", () => {
    gsap.fromTo(
        ".splide, .cardre",
        {x: -100},
        {x: 0, duration: 2.5, ease: "elastic.out(1.5,1)"}
    );
});

let isAnimating = false;
cardre.addEventListener("click", () => {
    if (!isAnimating) {
        isAnimating = true;
        const slidesNotActive = document.querySelectorAll(".splide__slide:not(.is-active)");
        document.querySelectorAll(".splide__arrow").forEach((arrow) => {
            arrow.style.display = "none";
        });
        gsap.to(slidesNotActive, {
            opacity: 0, duration: 1,
            onComplete: () => {
                gsap.to(".splide__track", {
                    duration: 0,
                    height: "100%",
                    onComplete: () => {
                        gsap.to(".cardre", {
                            scale: 1.3,
                            onComplete: () => {
                                gsap.to(".splide__slide.is-active", {
                                    scale: 1.3,
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        isAnimating = false;
        const slidesNotActive = document.querySelectorAll(".splide__slide:not(.is-active)");
        document.querySelectorAll(".splide__arrow").forEach((arrow) => {
            arrow.style.display = "flex";
        });
        gsap.to(".splide__slide.is-active", {
            scale: 1,
            onComplete: () => {
                gsap.to(".cardre", {
                    scale: 1,
                    onComplete: () => {
                        gsap.to(".splide__track", {
                            duration: 0,
                            height: "auto",
                            onComplete: () => {
                                gsap.to(slidesNotActive, {
                                    opacity: 1, duration: 1,
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
