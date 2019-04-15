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

    