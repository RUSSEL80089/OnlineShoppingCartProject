"use strict";

window.onload = function () {
  //cart box
  var iconShopping = document.querySelector('.iconShopping');
  var cartCloseBtn = document.querySelector('.fa-close');
  var cartBox = document.querySelector('.cartBox');
  iconShopping.addEventListener("click", function () {
    cartBox.classList.add('active');
  });
  cartCloseBtn.addEventListener("click", function () {
    cartBox.classList.remove('active');
  }); // adding data to localstorage

  var attToCartBtn = document.getElementsByClassName('attToCart');
  var items = [];

  var _loop = function _loop(i) {
    attToCartBtn[i].addEventListener("click", function (e) {
      if (typeof Storage !== 'undefined') {
        var item = {
          id: i + 1,
          name: e.target.parentElement.children[0].textContent,
          price: e.target.parentElement.children[1].children[0].textContent,
          no: 1
        };

        if (JSON.parse(localStorage.getItem('items')) === null) {
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          window.location.reload();
        } else {
          var localItems = JSON.parse(localStorage.getItem("items"));
          localItems.map(function (data) {
            if (item.id == data.id) {
              item.no = data.no + 1;
            } else {
              items.push(data);
            }
          });
          items.push(item);
          localStorage.setItem('items', JSON.stringify(items));
          window.location.reload();
        }
      } else {
        alert('local storage is not working on your browser');
      }
    });
  };

  for (var i = 0; i < attToCartBtn.length; i++) {
    _loop(i);
  } // adding data to shopping cart 


  var iconShoppingP = document.querySelector('.iconShopping p');
  var no = 0;
  JSON.parse(localStorage.getItem('items')).map(function (data) {
    no = no + data.no;
  });
  iconShoppingP.innerHTML = no; //adding cartbox data in table

  var cardBoxTable = cartBox.querySelector('table');
  var tableData = '';
  tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';

  if (JSON.parse(localStorage.getItem('items'))[0] === null) {
    tableData += '<tr><td colspan="5">No items found</td></tr>';
  } else {
    JSON.parse(localStorage.getItem('items')).map(function (data) {
      tableData += '<tr><th>' + data.id + '</th><th>' + data.name + '</th><th>' + data.no + '</th><th>' + data.price + '</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    });
  }

  cardBoxTable.innerHTML = tableData;
};