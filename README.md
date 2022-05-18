 OnlineShoppingCartProject
 ==========================
 
 Online Shopping Cart is a project which functions. All you have to do is place an order after filling in your `cart`.
 
 Table of contents
==================
<!--ts-->
   * [Installation](#installation)
   
   * [Usage](#usage)
   * [Pics](#pics)
   * [HTML](#HTML)
   * [CSS](#CSS)
   * [JavaScript](#JavaScript)
   * [JQUERY](#JQUERY)
 <!--te-->
 
Installation
============
1. installation locally click open this the _html file ` foodlife.html` using **Chrome**_ 
Usage
=============
* **Click** the _`add to cart`_ button to _add_ your product to the cart.*
* **Click** the _`REMOVE`_ button to _remove_ a product form your cart list.*
* You can increase a particular product just under the _Quantity_ heading.*
* Once satisfication is reached **select** your delivery option of delivery is required, if its collection no need to select *

* When all in in order **hit** the _`Confirm Order`_ button and an alert will _pop up_ with your **Order Number** *
* 
![Screenshot (45)](https://user-images.githubusercontent.com/91991118/169141312-42ca50b6-ed00-4557-b037-08538a4fde5e.png)

![Screenshot (47)](https://user-images.githubusercontent.com/91991118/169141338-e9eed414-dde8-4c1e-a364-10aaa66cf392.png)

![Screenshot (48)](https://user-images.githubusercontent.com/91991118/169141378-e1ef2034-46da-4643-8e87-0f84707dd561.png)


[All credits lies here!](https://www.hyperiondev.com)


Pics
=====
All the images were uploaded from [here](https://www.google.com/search?q=fruits+and+vegetables+pictures&oq=fruits+and+&aqs=chrome.2.69i57j0i433i512j0i512j0i457i512j0i512l6.6717j0j15&sourceid=chrome&ie=UTF-8).
HTML
=====
### HTML Files `.html`
The `foodlife.html` file is the main html file of the shopping-cart.
The following code links the `foodLife.html` file with other files that makes function like:
* `foodLife.css`
* `foodLife.js`
* `foodLifeJQuery.js`
```shell
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="
    sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="foodlife.css" type="text/css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" />
@@ -91,12 +101,69 @@

  CSS
  ====
  All the stlying of the page was done on the CSS file
  All the stlying of the page was done on the `CSS` file

  ```shell
  /*============================DROPDOWN MENU=================================*/
.accordion-container .accordion-title {
    position: relative;
    margin: 0;
    padding: 0.625em 0.625em 0.625em 2em;
    background-color: #000;
    font-size: 1.25em;
    font-weight: normal;
    color: #fff;
    cursor: pointer;
}
/*this is the hover of the headings, Once the user selects or click any heading the background colour
will change.*/
.accordion-container .accordion-title:hover,
.accordion-container .accordion-title:active,
.accordion-title.open {
    background-color: rgb(4, 247, 234);
}
.accordion-container .accordion-title::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 25px;
    width: 15px;
    height: 2px;
    transform: rotate(90deg);
    background: #fff;
    transition: all .3s ease-in-out;
}
.accordion-container .accordion-title::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 25px;
    width: 15px;
    height: 2px;
    background: #fff;
    transition: all .2s ease-in-out;
}
.accordion-container .accordion-title.open::before {
    transform: rotate(180deg);
}
.accordion-container .accordion-title.open::after {
    opacity: 0;
}
```


  JavaScript
  ===========

  `JavaScript` file contains the all the functions that enable the button to work like the `add to cart` button, `remove` button and much more.

  ```shell
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
```
  JQUERY
  =========
  
  This  is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation and event handling.
It is responsible for the _`DropDOWN Menu`_ to function
```shell
 /*this function creates a dropdown menu accordion,
        when the user clicks the accordion-title ( which is the the heading ie. h1 and h2), and will only open the heading clicked,
    This code allows only a specific heading to be open not all headings at once.
    The specific heading clicked will show its content.
        */
    $(".accordion-title").click(function() {
        $(".accordion-title").not(this).removeClass("open");
        $(".accordion-title").not(this).next().slideUp(300);
        $(this).toggleClass("open");
        $(this).next().slideToggle(300);
    });
    
 ```
  It is also responnsible for the **ALERT** _`WELCOME TO FOODLIFE MARKET!`_ **NOTE**
  
