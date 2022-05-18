//==========Shopping Cart===================

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// The below ready function allows setting of all event listerners when the document loads
function ready() {
    //======code for the add cart button==============

    //==============code for the remove button in the cart============
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    //=========code for the user to select the quantity in units in the cart===========
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //======code for the add cart button==============
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}



// below is the function for the remove button.
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    /* Every time we add updateCartTotal() so that when the user removes or delete
     an item previously added in the cart this code will update the page and the  final total*/
    updateCartTotal()
}
/*====function for the user to select the units desired=====
Also checks if the input is a number/is not a negative number
ensures that atleast we want 1 item to be purchased.*/
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function purchaseClicked() {
    let timestamp = new Date().getUTCMilliseconds();
    alert('Thank you for your purchase.' + 'Your order number is' + timestamp)
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}

//===========this is the function that will make the add cart button work=======
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('img-thumbnail img-fluid')[0].src
    addItemToCart(title, imageSrc, price)
    updateCartTotal()
}

/* below is the function that adds items in the cart when the user clicks 'Add to Cart' button and if the item is already exists in the cart,
an alert should popup showing that "this item is already added".
*/
function addItemToCart(title, imageSrc, price) {

    //This below collects just as it is in the html and add it in the cart with a remove button
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart')
            return
        }
    }


    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" min="1" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//Below is the function  that updates the page and the final total when the user adds an item or remove an item
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('R', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    let vat = total * 0.15
    vat = Math.round(vat * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + (total + vat);
    document.getElementsByClassName('cart-total-vat')[0].innerText = "VAT : " + 'R' + vat;
    alert("Your new total is " + "R" + (total + vat));
    let totalWithPromo = ((total + vat) * 0.55)
    document.getElementsByClassName('cart-total-promo')[0].innerText = "Total with DISCOUNT: " + 'R' + totalWithPromo.toFixed(2);

    // The final price is also rounded off to 2 decimal place. 
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + Math.round(total * 100) / 100
}



function applyStandardShipping() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let standardShipping = (shipping + 50);
    document.getElementsByClassName('cart-total-price')[0].innerText = standardShipping;
    alert("Standard shipping applied." + "\n Your new total is " + "R" + standardShipping)
}

//function to apply domestic Priority Shipping 

function applyPriorityShipping() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let priorityShipping = (shipping + 45);
    document.getElementsByClassName('cart-total-price')[0].innerText = priorityShipping;
    alert("Priority shipping applied." + "\n Your new total is " + "R" + priorityShipping)
}

//function for international Standard shipping to be added on buttn click

function applyIntStandardShipping() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let internationalStandard = (shipping + 100);
    document.getElementsByClassName('cart-total-price')[0].innerText = internationalStandard;
    alert("Standard International shipping applied." + "\n Your new total is " + "R" + internationalStandard)
}

//function for international Priority shipping to be added on buttn click

function applyInternationalPriority() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let internationalPriority = (shipping + 150);
    document.getElementsByClassName('cart-total-price')[0].innerText = internationalPriority;
    alert("International Priority shipping applied." + "\n Your new total is " + "R" + internationalPriority)
}

//Function for collection from store

function applyCollection() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let Collection = (shipping + 0);
    document.getElementsByClassName('cart-total-price')[0].innerText = Collection;
    alert("Collection option applied." + "\n Your new total is " + "R" + Collection)
}

//function for Free Shipping to be added on buttn click  
function applyFreeShipping() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let freeShipping = (shipping + 500);
    document.getElementsByClassName('cart-total-price')[0].innerText = freeShipping;
    alert("Free shipping applied to order." + "\n Your new total is " + "R" + freeShipping)
}

function applyUnderAmount() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let underAmountR500 = (shipping + 100);
    document.getElementsByClassName('cart-total-price')[0].innerText = underAmountR500;
    alert("R150 shipping fee applied." + "\n Your new total is " + "R" + underAmountR500)
}


function applyOverNight() {
    let totalWithoutShipping = document.getElementsByClassName('cart-total-price')[0].innerText;
    let shipping = parseFloat(totalWithoutShipping.replace('R', ''));
    let overNightshipping = (shipping + 250);
    document.getElementsByClassName('cart-total-price')[0].innerText = overNightshipping;
    alert("Overnight shipping applied." + "\n Your new total is " + "R" + overNightshipping)
}