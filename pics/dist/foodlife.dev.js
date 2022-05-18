"use strict";

//==========Shopping Cart===================
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
} // The below ready function allows setting of all event listerners when the document loads


function ready() {
  //======code for the add cart button==============
  //==============code for the remove button in the cart============
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  } //=========code for the user to select the quantity in units in the cart===========


  var quantityInputs = document.getElementsByClassName('cart-quantity-input');

  for (var _i = 0; _i < quantityInputs.length; _i++) {
    var input = quantityInputs[_i];
    input.addEventListener('change', quantityChanged);
  } //======code for the add cart button==============


  var addToCartButtons = document.getElementsByClassName('shop-item-button');

  for (var _i2 = 0; _i2 < addToCartButtons.length; _i2++) {
    var _button = addToCartButtons[_i2];

    _button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
} // below is the function for the remove button.


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  /* Every time we add updateCartTotal() so that when the user removes or delete
   an item previously added in the cart this code will update the page and the  final total*/

  updateCartTotal();
}
/*====function for the user to select the units desired=====
Also checks if the input is a number/is not a negative number
ensures that atleast we want 1 item to be purchased.*/


function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updateCartTotal();
}

function purchaseClicked() {
  var timestamp = new Date().getUTCMilliseconds();
  alert('Thank you for your purchase.' + 'Your order number is' + timestamp);
  var cartItems = document.getElementsByClassName('cart-items')[0];

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  updateCartTotal();
} //===========this is the function that will make the add cart button work=======


function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('img-thumbnail img-fluid')[0].src;
  addItemToCart(title, imageSrc, price);
  updateCartTotal();
}
/* below is the function that adds items in the cart when the user clicks 'Add to Cart' button and if the item is already exists in the cart,
an alert should popup showing that "this item is already added".
*/


function addItemToCart(title, imageSrc, price) {
  //This below collects just as it is in the html and add it in the cart with a remove button
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already in your cart');
      return;
    }
  }

  var cartRowContents = "\n        <div class=\"cart-item cart-column\">\n            <img class=\"cart-item-image\" src=\"".concat(imageSrc, "\" width=\"100\" height=\"100\">\n            <span class=\"cart-item-title\">").concat(title, "</span>\n        </div>\n        <span class=\"cart-price cart-column\">").concat(price, "</span>\n        <div class=\"cart-quantity cart-column\">\n            <input class=\"cart-quantity-input\" min=\"1\" type=\"number\" value=\"1\">\n            <button class=\"btn btn-danger\" type=\"button\">REMOVE</button>\n        </div>\n    ");
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
} //Below is the function  that updates the page and the final total when the user adds an item or remove an item


function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('R', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  var vat = total * 0.15;
  vat = Math.round(vat * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + (total + vat);
  document.getElementsByClassName('cart-total-vat')[0].innerText = "VAT : " + 'R' + vat;
  alert("Your new total is " + "R" + (total + vat));
  var totalWithPromo = (total + vat) * 0.55;
  document.getElementsByClassName('cart-total-promo')[0].innerText = "Total with DISCOUNT: " + 'R' + totalWithPromo.toFixed(2); // The final price is also rounded off to 2 decimal place. 

  document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + Math.round(total * 100) / 100;
}

function applyStandardShipping() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var standardShipping = shipping + 50;
  document.getElementsByClassName('cart-total-price')[0].innerText = standardShipping;
  alert("Standard shipping applied." + "\n Your new total is " + "R" + standardShipping);
} //function to apply domestic Priority Shipping 


function applyPriorityShipping() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var priorityShipping = shipping + 45;
  document.getElementsByClassName('cart-total-price')[0].innerText = priorityShipping;
  alert("Priority shipping applied." + "\n Your new total is " + "R" + priorityShipping);
} //function for international Standard shipping to be added on buttn click


function applyIntStandardShipping() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var internationalStandard = shipping + 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = internationalStandard;
  alert("Standard International shipping applied." + "\n Your new total is " + "R" + internationalStandard);
} //function for international Priority shipping to be added on buttn click


function applyInternationalPriority() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var internationalPriority = shipping + 150;
  document.getElementsByClassName('cart-total-price')[0].innerText = internationalPriority;
  alert("International Priority shipping applied." + "\n Your new total is " + "R" + internationalPriority);
} //Function for collection from store


function applyCollection() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var Collection = shipping + 0;
  document.getElementsByClassName('cart-total-price')[0].innerText = Collection;
  alert("Collection option applied." + "\n Your new total is " + "R" + Collection);
} //function for Free Shipping to be added on buttn click  


function applyFreeShipping() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var freeShipping = shipping + 500;
  document.getElementsByClassName('cart-total-price')[0].innerText = freeShipping;
  alert("Free shipping applied to order." + "\n Your new total is " + "R" + freeShipping);
}

function applyUnderAmount() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var underAmountR500 = shipping + 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = underAmountR500;
  alert("R150 shipping fee applied." + "\n Your new total is " + "R" + underAmountR500);
}

function applyOverNight() {
  var totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
  var shipping = parseFloat(totalWithoutShipping.replace('R', ''));
  var overNightshipping = shipping + 250;
  document.getElementsByClassName('cart-total-price')[0].innerText = overNightshipping;
  alert("Overnight shipping applied." + "\n Your new total is " + "R" + overNightshipping);
}