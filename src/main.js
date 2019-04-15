'use strict'; 
let cart = (JSON.parse(localStorage.getItem('cart'))|| []);
const addToCartButtonDOM = document.querySelectorAll('[data-action="ADD_TO_CART"');
const cartDOM = document.querySelector('.cart')

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem; 
    insertItemToDOM(product)
    countCartTotal();

    addToCartButtonDOM.forEach((addToCartButtonDOM) => {
      const productDOM = addToCartButtonDOM.parentNode;
      
      if (productDOM.querySelector('.product__name').innerText === product.name) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });
  });
}

addToCartButtonDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
  const productDOM = addToCartButtonDOM.parentNode;
  const product = { 
    name: productDOM.querySelector('.product__name').innerText,
    price: productDOM.querySelector('.product__price').innerText,
    quantity: 1
  };

  const inCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
      
    if(inCart === false) {
      insertItemToDOM(product)
      cart.push(product)
      countCartTotal()
      localStorage.setItem('cart', JSON.stringify(cart));
      handleActionButtons(addToCartButtonDOM, product)
    }
  });
});
  
function countCartTotal() {
  let cartTotal = 0 ;
  cart.forEach(cartItem => {
    cartTotal = cartTotal + (Number(cartItem.price) * cartItem.quantity)
    console.log(cartTotal)
  })
  document.querySelector('.cart__total').innerText = `${cartTotal}`
}

function insertItemToDOM(product) {
  cartDOM.insertAdjacentHTML('beforeend', `
    <div class="cart__item">
      <h3 class="cart__item__name">${product.name}</h3>
      <h3 class="cart__item__price">${product.price}</h3>
      <h3 class="cart__item__quantity">${product.quantity}</h3>
      <button class="btn btn--primary btn--small" data-action="DECREASE_ITEM">&minus;</button>
      <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
      <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
    </div>
  `);
  addCartFooter();
}

function handleActionButtons(addToCartButtonDOM, product) {
  addToCartButtonDOM.innerText = 'In Cart';
  addToCartButtonDOM.disable = true; 

  const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM, addToCartButtonDOM));
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });
}

function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        removeItem(product, cartItemDOM, addToCartButtonDOM);
      }

      if (cartItem.quantity === 1) {
        cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
      }
    }
  });
}

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
  cartItemDOM.classList.add('cart__item--removed');
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  localStorage.setItem('cart', JSON.stringify(cart));
  addToCartButtonDOM.innerText = 'Add To Cart';
  addToCartButtonDOM.disabled = false;

  if (cart.length < 1) {
    document.querySelector('.cart__footer').remove();
  }
}

function addCartFooter(){
if(document.querySelector('.cart__footer') === null){
  cartDOM.insertAdjacentHTML('afterend', `
  <div class="cart__footer">
    <button class="btn btn--danger" data-action="CLEAR_CART">Clear Cart</button>
    <h3 class="cart__total">Total</h3>
    <input class="add-promo-value" type="text" placeholder="add promo"/>
    <button id="promo" class="btn btn--primary btn--small" data-action="ADD_PROMO">Add Promo</button>
  </div>
  `);

  document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
  document.querySelector('#promo').addEventListener('click', () => addPromo());
  }
}

function clearCart() {
  cartDOM.querySelectorAll('.cart__item').forEach(cartItemDOM => {
    cartItemDOM.classList.add('cart__item--removed');
    setTimeout(() => cartItemDOM.remove(), 250);

  });

  cart = [];
  localStorage.removeItem('cart');
  document.querySelector('.cart__footer').remove();

  addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.innerText = 'Add To Cart';
    addToCartButtonDOM.disabled = false;
  });
}

function addPromo() {
  let promoValue = document.querySelector('.add-promo-value')
  let cartTotal = document.querySelector('.cart__total')
  let newTotal = Number(cartTotal.innerText) - (promoValue.value)
  document.querySelector('.cart__total').innerText = newTotal
}