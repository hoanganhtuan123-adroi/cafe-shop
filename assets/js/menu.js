"use strict";
const header = document.querySelector(".header");
const heightOfHeader = header.getBoundingClientRect().height;
const btnUp = document.querySelector(".up-btn");
const cartBuying = document.querySelector(".cart-btn");

const headerCallBack = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        btnUp.style.opacity = 1;
        cartBuying.style.opacity = 1;
    } else {
        btnUp.style.opacity = 0;
        cartBuying.style.opacity = 0;
    }
    console.log(entry);
};

const headerObserver = new IntersectionObserver(headerCallBack, {
    root: null,
    threshold: 0,
});

headerObserver.observe(header);
