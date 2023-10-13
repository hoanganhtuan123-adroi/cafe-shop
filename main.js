// Overlay
const overlayModal = document.querySelector(".overlay");
const signInModal = document.querySelector(".signIn-modal");
const signUpModal = document.querySelector(".signUp-modal");
document.addEventListener("keydown", function (e) {
    if (
        e.key === "Escape" &&
        !modalAbout.classList.contains("hidden") &&
        !overlayModal.classList.contains("hidden")
    ) {
        closeAboutUs();
    }
});

// Sign in - Sign up
const btnOpenSignIn = document.querySelector(".js-sign-in");
const btnCloseModal = document.querySelector(".js-closeSignIn");

const btnCloseSignUp = document.querySelector(".js-closeSignUp");
const btnOpenSignUp = document.querySelector(".js-sign-up");

const openSignUp = function () {
    signUpModal.classList.remove("hidden");
    overlayModal.classList.remove("hidden");
};

const closeSignUp = function () {
    signUpModal.classList.add("hidden");
    overlayModal.classList.add("hidden");
};

const openModal = function () {
    signInModal.classList.remove("hidden");
    overlayModal.classList.remove("hidden");
};

const closeModal = function () {
    signInModal.classList.add("hidden");
    overlayModal.classList.add("hidden");
};

btnOpenSignUp.addEventListener("click", openSignUp);

btnCloseSignUp.addEventListener("click", closeSignUp);

btnOpenSignIn.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !signInModal.classList.contains("hidden")) {
        closeModal();
    }

    if (e.key === "Escape" && !signUpModal.classList.contains("hidden")) {
        closeSignUp();
    }
});

// About
const openAbout = document.querySelector(".js-about-btn");
const modalAbout = document.querySelector(".about-modal");
const closeAbout = document.querySelector(".js-closeAbout");

function btnOpenAboutUs() {
    modalAbout.classList.remove("hidden");
    overlayModal.classList.remove("hidden");
}

openAbout.addEventListener("click", btnOpenAboutUs);

function closeAboutUs() {
    modalAbout.classList.add("hidden");
    overlayModal.classList.add("hidden");
}

closeAbout.addEventListener("click", closeAboutUs);

// Sticky navigation: Intersection Observer API
const header = document.querySelector(".header");
const nav = document.querySelector(".header__top");
const links = document.querySelectorAll(".link");
const logo = document.querySelector(".logo__text");

const headerCallBack = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
        links.forEach((link) => (link.style.color = "#fff"));
        logo.style.color = "#fff";
        nav.style.padding = "10px 20px";
    } else {
        nav.classList.remove("sticky");
        links.forEach((link) => (link.style.color = "#fff"));
        logo.style.color = "#fff";
    }
};

const headerOptions = {
    root: null,
    rootMargin: "-250px",
    threshold: 0,
};

const headerSticky = new IntersectionObserver(headerCallBack, headerOptions);
headerSticky.observe(header);

// Handle Hover

const handleHover = function (e, opacity) {
    if (e.target.classList.contains("link")) {
        const link = e.target;
        const siblings = link.closest(".header__top").querySelectorAll(".link");
        const logo = link.closest(".header__top").querySelector(".logo__text");

        siblings.forEach((el) => {
            if (el !== link) {
                el.style.transition = "0.3s";
                el.style.opacity = opacity;
            }
        });
        logo.style.opacity = opacity;
    }
};

nav.addEventListener("mouseover", function (e) {
    handleHover(e, 0.4);
});

nav.addEventListener("mouseout", function (e) {
    handleHover(e, 1);
});

// Revealing section
const Allsection = document.querySelectorAll(".section");

const sectionCallBack = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionCallBack, {
    root: null,
    threshold: 0.15,
});

Allsection.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// Lazy loading
// const allImgLoad = document.querySelectorAll("img[data-src]");

// const imgLoad = function (entries, observer) {
//     const [entry] = entries;
//     console.log(entry)
//     if (!entry.isIntersecting) return;
//     entry.target.src = entry.target.dataset.src;
//     entry.target.addEventListener("load", function () {
//         entry.target.classList.remove("lazy-loading");
//     });
//     observer.unobserve(entry.target)
// };

// const imgLazyLoad = new IntersectionObserver(imgLoad, {
//     root: null,
//     threshold: 0,
//     rootMargin: "200px",
// });

// allImgLoad.forEach((el) => {
//     imgLazyLoad.observe(el);
// });

// Slides
const slides = document.querySelectorAll(".slide");
const btnMoveSlide = document.querySelector(".feedBtn--right");
const btnBackSlide = document.querySelector(".feedBtn--left");
const maxSlide = slides.length;
let curSlide = 0;

slides.forEach((slide, i) => {
    slide.style.transform = "translateX(0%)";
});

btnMoveSlide.addEventListener("click", function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-100 * curSlide}%)`;
    });
});

btnBackSlide.addEventListener("click", function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-100 * curSlide}%)`;
    });
});
