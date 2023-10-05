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

// Scroll

