export const modalBasket = document.querySelector('.header__basket-icon')
export const openBasket = document.querySelector('.basket-modal')
export const openBasketBG = document.querySelector('.basket-modal__background')
export const closeBasketModal = document.querySelector('.basket-modal__close-button')
const catalogueCards = document.querySelector('.catalogue__cards')
export const basketModalItem = document.querySelector('.basket-modal__item')
export const basketEmpty = document.querySelector('.basket-modal__empty')
export const basketModalFooter = document.querySelector('.basket-modal__footer')


export function openCartbyClick() {
modalBasket.addEventListener('click', () => {
    openBasket.style.display = 'block';

    const basketChildrenLength = [...basketModalItem.children].length


    basketChildrenLength >= 2
    ? basketEmpty.style.display = 'none'
    : basketEmpty.style.display = 'block'

    console.log(basketChildrenLength)

    basketChildrenLength <2
        ? basketModalFooter.style.display = 'none'
        : basketModalFooter.style.display = 'block'

    })
}

openCartbyClick();

export function closeBasket() {
closeBasketModal.addEventListener('click', () => {
    openBasket.style.display = 'none'
})

openBasketBG.addEventListener('click', (e) => {
    if(e.target === e.currentTarget) {
        openBasket.style.display = 'none'

    }

})
}

closeBasket();


// async function fetchProductsJSON() {
//     const response = await fetch('../data/products.json')
//     return response.json()
// }
//
// const productsData = fetchProductsJSON().then((product) => {
//     const abjArr = Object.values(product);
//
//     console.log(typeof abjArr)
//
// })

fetch('../data/products.json')
    .then((response) => response.json())
    .then(productsArray => Object.values(productsArray))
    .then(productsArray => allProductsRender(productsArray[0]))


function allProductsRender(productsArray) {
    productsArray.forEach(product => oneProductRender(product))
}

function oneProductRender(product) {

    const card = document.querySelector('.catalogue__cards');

    card.insertAdjacentHTML('beforeend',
        ` <div class="catalogue__card-item" data-prodid=${product.id}>
                              <a href="cardPage.html?id=${product.id}" > <img class="catalogue__card-img" src=${product.img} alt=${product.name} ></a>
                            <a href="cardPage.html?id=${product.id}" class="catalogue__card-title title">${product.name}</a>
                            <p class="catalogue__card-description">${product.description}</p>
                            <p class="catalogue--card-price">${product.price + '$'}</p>
                            <button class="button">Add to Cart</button>
                        </div>`
    )
}

fetch('../data/products.json')
    .then((response) => response.json())
    .then(cartsArray => Object.values(cartsArray) )
    .then(cartsArray => addToCart(cartsArray[0]))


export function addToCart (cartsArray) {
    catalogueCards.addEventListener('click', (e) => {

        if (e.target.closest('.button')) {

            const btn = e.target.closest('.button')
            btn.setAttribute("disabled", "disabled")
            btn.textContent = "Added"
            const cardItem = e.target.closest('.catalogue__card-item')

            cartsArray.map(cart => {

            if (cardItem.dataset.prodid === cart.id) { /// якщо дата картки на яку клікнули і айді товара співпадає


                    openBasket.style.display = 'block';
                    basketEmpty.style.display = 'none'

                totalSumCalc();

                    basketModalItem.insertAdjacentHTML('afterbegin', `
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
                }
})
        }
    })

}

export function basketSetQuantity() {
basketModalItem.addEventListener('click', (e) => {
    if (e.target.closest('.basket-modal__item-body')) {

        let target = e.target.closest('.basket-modal__item-body')
        const inputs = document.querySelectorAll('.basket-modal__item-input')
        const itemSum = document.querySelectorAll('.basket-modal__item-sum')


        if (target.closest('.basket-modal__item-body')) {


            if (e.target.closest('.basket-modal__item-plus')) {
                inputs.forEach(input => {
                    if (input.dataset.pid === target.dataset.pid) {
                        ++input.value

                        itemSum.forEach(sum => {

                            if (sum.dataset.pid === target.dataset.pid) {
                                sum.textContent = `${sum.dataset.cost * input.value + '$'}` // вирахувати вартість при додаванні кількості
                                sum.dataset.val = `${input.value}`
				totalSumCalc();
                            }

                        })
                    }
                })
            }

            if (e.target.closest('.basket-modal__item-minus')) {

                inputs.forEach(input => {
                    if (input.dataset.pid === target.dataset.pid) {
                        --input.value

                        itemSum.forEach(sum => {
                            if (sum.dataset.pid === target.dataset.pid) {

                                sum.textContent = `${sum.dataset.cost * input.value + '$'}`
                                sum.dataset.val = `${input.value}`
				totalSumCalc();
                            }
                        })

                        if (input.value < 1) {
                            target.remove()

                            const basketChildrenLength = [...basketModalItem.children].length
                            basketChildrenLength < 2
                                ? basketEmpty.style.display = 'block'
                                : basketEmpty.style.display = 'none'

                            basketChildrenLength <2
                                ? basketModalFooter.style.display = 'none'
                                : basketModalFooter.style.display = 'block'

                            totalSumCalc();


                        }
                    }
                })
            }

            if (e.target.closest('.basket-modal__item-del')) {
                basketModalItem.removeChild(target)

                const basketChildrenLength = [...basketModalItem.children].length
                basketChildrenLength < 2
                    ? basketEmpty.style.display = 'block'
                    : basketEmpty.style.display = 'none'

                basketChildrenLength <2
                    ? basketModalFooter.style.display = 'none'
                    : basketModalFooter.style.display = 'block'
		 totalSumCalc();
            }

           
        }
    }
})

}



export function totalSumCalc() {
    const cartItems = document.querySelectorAll('.basket-modal__item-body')

    let total = 0;

    cartItems.forEach( function (item) {

        const currentPrice = parseInt(item.querySelector('.basket-modal__item-sum').textContent)
        total += currentPrice
    })


    const sumField = document.querySelector('.basket-modal__total-sum')
    sumField.textContent = `Total Price: ${total}$`

    if(cartItems.length < 1){
    sumField.textContent = ""
}
}


 basketSetQuantity();





