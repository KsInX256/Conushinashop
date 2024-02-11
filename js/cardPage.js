import {openCartbyClick, closeBasket, basketSetQuantity, totalSumCalc, basketModalItem} from "/js/index.js";


openCartbyClick();
closeBasket();
totalSumCalc();

fetch('../data/products.json')
    .then((response) => response.json())
    .then(productsArray => Object.values(productsArray))
    .then(productsArray => allCardPagesRender(productsArray[0]))


function allCardPagesRender(productsArray) {
    let params = (new URL(document.location)).searchParams;
    let clickedProdId = params.get("id")
    productsArray.forEach(product => {
        if(product.id === clickedProdId) {
            oneCardPageRender(product);
            addToBasket(product)
        }
})
}

function oneCardPageRender(product) {
    const prod = document.querySelector('.product');

    prod.insertAdjacentHTML('beforeend',
        `
<div class="product__container">
<div class="product__container-row1">
    <div class="product__image-wrap">
        <img class="product__image" alt="product" src=${product.img}>
    </div>
</div>

<div class="product__container-row2">
            <div class="product__title">${product.name}</div>
            <div class="product__description">${product.description} </div>
            <div class="product__price">${product.price}$</div>
            <button class="product__button button">Add to Cart</button>
        </div>
    </div>
`
    )
}


function addToBasket(cart) {

    const productButton = document.querySelector('.product__button')
    productButton.addEventListener('click', e => {
        productButton.setAttribute("disabled", "disabled")
        productButton.textContent = "Added"

        basketModalItem.insertAdjacentHTML('afterbegin',
            `
            <div class="basket-modal__item-body" data-pid = ${cart.id}>
             <div class="basket-modal__item-photo">
        <a href="cardPage.html?id=${cart.id}" class="basket-modal__item-link">
            <img src=${cart.img} alt=${cart.name} class="basket-modal__item-img">
        </a>
        </div>

        <div class="basket-modal__item-name ">
        <a href="cardPage.html?id=${cart.id}" class="basket-modal__item-link title">
            <p class="basket-modal__item-title ">${cart.name}</p>
        </a>
        </div>

        <div class="basket-modal__item-counter">
            <button class="basket-modal__item-minus" data-pid = ${cart.id}>-</button>
            <input type="text" value="1" class="basket-modal__item-input" data-pid = ${cart.id}>
            <button class="basket-modal__item-plus" data-pid = ${cart.id}>+</button>

        </div>

        <div class="basket-modal__item-sum title " data-cost = ${cart.price} data-val = '1' data-pid = ${cart.id}>
            ${cart.price}$
        </div>

       <div class="basket-modal__item-del">del</div>
       </div>
</div>
</div>`)

        totalSumCalc();
    })

}


