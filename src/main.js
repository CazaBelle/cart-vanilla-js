'use strict'; 
let cart = [];

const addToCartButtonDOM = document.querySelectorAll('[data-action="ADD_TO_CART"');

const cartDOM = document.querySelector('.cart')
addToCartButtonDOM.forEach((addToCartButtonDOM) => {
  addToCartButtonDOM.addEventListener('click', () =>{
    const productDOM = addToCartButtonDOM.parentNode;
    const product = { 
      name: productDOM.querySelector('.product__name').innerText,
      price: productDOM.querySelector('.product__price').innerText,
      quantity: 1
  
    };

    const inCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);
      
    if(inCart === false) {
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

      //Increase Item
      cartItemsDOM.forEach(cartItemDOM => {
        if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name){
          cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if(cartItem.name === product.name){
                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity; 
                localStorage.setItem('cart', JSON.stringify(cart));
                countCartTotal()
              }
            });
          });