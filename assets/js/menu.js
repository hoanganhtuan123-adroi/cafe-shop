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
};

const headerObserver = new IntersectionObserver(headerCallBack, {
    root: null,
    threshold: 0,
});

headerObserver.observe(header);

// Open cart
const openCart = document.querySelectorAll(".openCart");
const closeCart = document.querySelector(".shoppingCart__close");
const shoppingCart = document.querySelector(".shoppingCart");
openCart.forEach((open) => {
    open.addEventListener("click", function () {
        shoppingCart.classList.add("active-shop");
    });
});

closeCart.addEventListener("click", function () {
    shoppingCart.classList.remove("active-shop");
});

window.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && shoppingCart.classList.contains("active-shop")) {
        shoppingCart.classList.remove("active-shop");
    }
});

// List products
const drinkProductHtml = document.querySelector(".menu__row--first");
const listCartProduct = document.querySelector(".shoppingCart__items");
const iconCartQuantity = document.querySelector(".quantity-item ");
const totalProduct = document.querySelector(".quantity");
const increaseProduct = document.querySelector(".shoppingCart__btn-incrs");
const decreaseProduct = document.querySelector(".shoppingCart__btn-minus");
let listDrink = [];
let carts = [];
//Add drink

const addDataToHTML = function () {
    // drinkProductHtml.innerHTML = "";
    if (listDrink.length > 0) {
        listDrink.forEach((product) => {
            let newProduct = document.createElement("article");
            newProduct.classList.add("menu-item");
            newProduct.dataset.id = product.id;
            newProduct.dataset.aos = "fade-up";
            newProduct.innerHTML = `
            <img
            src=${product.img}
            alt=""
            class="menu-item__thumb"
            />
            <section class="menu-item__body">
                <h3 class="menu-item__title">
                    ${product.name}
                </h3>
                <div class="menu-item__body-inf">
                    <span class="menu-item__price">$ ${product.price}</span>
                    <button data-text="Add to cart" class="add-cart">
                        <i class="fa-solid fa-plus add-cart__icon"></i>
                    </button>
            </div>
            </section>
            `;
            drinkProductHtml.appendChild(newProduct);
        });
    }
};

drinkProductHtml.addEventListener("click", (e) => {
    const positionClick = e.target;
    if (e.target.classList.contains("add-cart__icon")) {
        let productId =
            positionClick.closest(".menu-item__body").parentElement.dataset.id;
        addToCart(productId);
    }
});

const addToCart = (productId) => {
    let positionThisProductInCart = carts.findIndex(
        (value) => value.productId == productId
    );
    if (carts.length <= 0) {
        carts = [
            {
                productId: productId,
                quantity: 1,
            },
        ];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            productId: productId,
            quantity: 1,
        });
    } else {
        carts[positionThisProductInCart].quantity =
            carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
    listCartProduct.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach((cart) => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement("article");
            newCart.dataset.id = cart.productId;
            newCart.classList.add("shoppingCart__item");
            let positionProduct = listDrink.findIndex(
                (value) => value.id == cart.productId
            );
            let info = listDrink[positionProduct];
            newCart.innerHTML = `
            <img
                src= "${info.img}"
                alt=""
                class="shoppingCart__thumb"
            />
            <div class="shoppingCart__box">
                <h3 class="shoppingCart__name">
                ${info.name}
                </h3>
                <span class="shoppingCart__price">Price:
                    <span class="shoppingCart__price--product">
                    ${(info.price * cart.quantity).toFixed(1)}
                    </span>
                </span>
             </div>
            <div class="shoppingCart__container">
                        <i class="fa-solid fa-arrow-up shoppingCart__btn-incrs"></i>
                        <span class="shoppingCart_quantity">
                            ${cart.quantity}</span>
                        <i class="fa-solid fa-arrow-down shoppingCart__btn-minus"></i>
            </div>`;
            listCartProduct.appendChild(newCart);
        });
    }
    totalProduct.innerText = totalQuantity;
};

listCartProduct.addEventListener("click", (e) => {
    let positionClick = e.target;
    if (
        positionClick.classList.contains("shoppingCart__btn-minus") ||
        positionClick.classList.contains("shoppingCart__btn-incrs")
    ) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = "minus";
        if (positionClick.classList.contains("shoppingCart__btn-incrs")) {
            type = "plus";
        }
        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let positionItemCart = carts.findIndex(
        (value) => value.productId == product_id
    );
    if (positionItemCart >= 0) {
        switch (type) {
            case "plus":
                carts[positionItemCart].quantity =
                    carts[positionItemCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
};

const initDrink = () => {
    fetch("./assets/js/drink.json")
        .then((response) => response.json())
        .then((data) => {
            listDrink = data;
            addDataToHTML();
            if (localStorage.getItem("cart")) {
                carts = JSON.parse(localStorage.getItem("cart"));
                addCartToHTML();
            }
        });
};
initDrink();

// Add drinks
/*
const productsDrink = document.querySelector(".menu__row--first");
const productsFood = document.querySelector(".menu__row--second");
const drinkLength = drinks.length;
const foodLength = foods.length;
let strDrink = "";
let strFood = "";

for (let i = 0; i < drinkLength; i++) {
    strDrink += `
    <article data-set="${drinks[i].key}" class="menu-item wow animate__fadeInLeft">
        <img
        src=${drinks[i].img}
        alt=""
        class="menu-item__thumb"
        />
        <section class="menu-item__body">
            <h3 class="menu-item__title">
                ${drinks[i].name}
            </h3>
            <div class="menu-item__body-inf">
                <span class="menu-item__price">$ ${drinks[i].price}</span>
                <button onClick="addDrinkToCart(${drinks[i].id})" data-text="Add to cart" class="add-cart">
                    <i class="fa-solid fa-plus add-cart__icon"></i>
                </button>
        </div>
        </section>
    </article>`;
}
productsDrink.innerHTML = strDrink;

// Add foods
for (let i = 0; i < foodLength; i++) {
    strFood += `<article data-set="${foods[i].key}" class="menu-item wow animate__fadeInRight">
    <img
    src=${foods[i].img}
    alt=""
    class="menu-item__thumb"
    />
    <section class="menu-item__body">
        <h3 class="menu-item__title">
            ${foods[i].name}
        </h3>
        <div class="menu-item__body-inf">
            <span class="menu-item__price">$ ${foods[i].price}</span>
            <button onClick="addFoodToCart(${foods[i].id})" data-text="Add to cart" class="add-cart">
                <i class="fa-solid fa-plus add-cart__icon"></i>
            </button>
    </div>
    </section>
</article>`;
}
productsFood.innerHTML = strFood;

// Open cart
const openCart = document.querySelectorAll(".openCart");
const closeCart = document.querySelector(".shoppingCart__close");
const shoppingCart = document.querySelector(".shoppingCart");
openCart.forEach((open) => {
    open.addEventListener("click", function () {
        shoppingCart.classList.add("active-shop");
    });
});

closeCart.addEventListener("click", function () {
    shoppingCart.classList.remove("active-shop");
});

window.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && shoppingCart.classList.contains("active-shop")) {
        shoppingCart.classList.remove("active-shop");
    }
});

// Add to cart
const totalQuantity = document.querySelectorAll(".quantity");
totalQuantity.forEach((item) => {
    if (item.innerText === "0") item.style.opacity = 0;
});
const cartItems = document.querySelector(".shoppingCart__items");
const cartItem = document.querySelectorAll(".shoppingCart__item");
let countItem = 0;
const cartShow = document.querySelector(".cart-btn__icon");
const addToCart = function () {
    countItem++;
    totalQuantity.forEach((item) => {
        item.innerText = countItem;
        if (item.innerText !== "0") item.style.opacity = 1;
    });
};

const listProductHTML = document.querySelector(".menu__row");
listProductHTML.addEventListener("click", (e) => {
    let positionClick = e.target;
    if (e.target.classList.contains("add-cart")) {
        alert("1");
    }
});

// Buy drink
/*
const addDrinkToCart = function (id) {
    addToCart();
    for (let i = 0; i < drinkLength; i++) {
        if (id === drinks[i].id) {
            let newDrink = `<article class="shoppingCart__item">
            <img
                src= ${drinks[i].img}
                alt=""
                class="shoppingCart__thumb"
            />
            <div class="shoppingCart__box">
                <h3 class="shoppingCart__name">
                ${drinks[i].name}
                </h3>
                <span class="shoppingCart__price"
                    >Price:
                    <span class="shoppingCart__price--product"
                        >${drinks[i].price}</span
                    >
                </span>
            </div>
            <label class="shoppingCart__container">
                            <input
                                class="shoppingCart__input"
                                type="number"
                                name=""
                                id=""
                                min="0"
                                value="1"
                            />
                            <i class="fa-solid fa-trash-can shoppingCart__trash"></i>
            </label>
        </article>`;
            cartItems.insertAdjacentHTML("afterbegin", newDrink);
        }
    }
};

// Buy food
const addFoodToCart = function (id) {
    addToCart();
    for (let i = 0; i < foodLength; i++) {
        if (id === foods[i].id) {
            let newDrink = `<article class="shoppingCart__item">
            <img
                src= ${foods[i].img}
                alt=""
                class="shoppingCart__thumb"
            />
            <div class="shoppingCart__box">
                <h3 class="shoppingCart__name">
                ${foods[i].name}
                </h3>
                <span class="shoppingCart__price"
                    >Price:
                    <span class="shoppingCart__price--product"
                        >${foods[i].price}</span
                    >
                </span>
            </div>
            <label class="shoppingCart__container">
                            <input
                                class="shoppingCart__input"
                                type="number"
                                name=""
                                id=""
                                min="0"
                                value="1"
                            />
                            <i class="fa-solid fa-trash-can shoppingCart__trash"></i>
            </label>
        </article>`;

            cartItems.insertAdjacentHTML("afterbegin", newDrink);
        }
    }
};
*/
