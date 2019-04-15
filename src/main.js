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

      if(document.querySelector('.cart__footer') === null){
        cartDOM.insertAdjacentHTML('afterend', `
        <div class="cart__footer">
          <h3 class="cart__total">Total</h3>
            <input class="add-promo-value" type="text" placeholder="add promo"/>
            <button id="promo" class="btn btn--primary btn--small" data-action="ADD_PROMO">Add Promo</button>
        </div>
        `);
      }
      //Increase Item
      cartItemsDOM.forEach(cartItemDOM => {
        if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name){
          cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              if(cartItem.name === product.name){
                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity; 
              
                countCartTotal()
              }
            });
          });

           //Decrease item from cart
           cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => {
             cart.forEach(cartItem => {
              
               if(cartItem.name === product.name){
                 if(cartItem.quantity > 1) {
                 cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity; 
             
                 countCartTotal()
                 }else {
                   cartItemDOM.remove();
                   cart = cart.filter(cartItem => cartItem.name !== product.name);
                   addToCartButtonDOM.innerText = 'Add to Cart';
                  
                 }
               }
             });
           });
  
          //Remove item from cart 
          cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => {
            cart.forEach(cartItem => {
              
              if(cartItem.name === product.name){
                  cartItemDOM.remove();
                  cart = cart.filter(cartItem => cartItem.name !== product.name);
                  localStorage.setItem('cart', JSON.stringify(cart));
                  countCartTotal()
                  addToCartButtonDOM.innerText = 'Add to Cart';
                  addToCartButtonDOM.disabled = false;
              }      
            });
          });
        }
      })
    }   
  }) 
})
function countCartTotal() {
  let cartTotal = 0 ;
  cart.forEach(cartItem => {
    cartTotal = cartTotal + (Number(cartItem.price) * cartItem.quantity)
    console.log(cartTotal)
  })
  document.querySelector('.cart__total').innerText = `Total: £${cartTotal}`

}