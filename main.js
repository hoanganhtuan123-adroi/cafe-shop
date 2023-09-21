const btnOpenSignin = document.querySelector(".js-sign-in");
const btnOpenSignup = document.querySelector(".js-sign-up");
const btnCloseModal = document.querySelector(".js-closeModal");
const modal = document.querySelector(".modal");

const openModal = function () {
    modal.classList.remove("hidden");
};

btnOpenSignup.addEventListener("click", openModal);

const closeModal = function () {
    modal.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
