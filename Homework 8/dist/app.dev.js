'use strict';

var fitlerPopup = document.querySelector('.filterPopup');
var fitlerLabel = document.querySelector('.filterLabel');
var filterIcon = document.querySelector('.filterIcon');
fitlerLabel.addEventListener('click', function () {
  fitlerPopup.classList.toggle('hidden');
  fitlerLabel.classList.toggle('filterLabelPink');
  filterIcon.classList.toggle('filterIconPink');

  if (filterIcon.getAttribute('src') === 'images/filter.svg') {
    filterIcon.setAttribute('src', 'images/filterHover.svg');
  } else {
    filterIcon.setAttribute('src', 'images/filter.svg');
  }
});
var filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
  header.addEventListener('click', function (event) {
    event.target.nextElementSibling.classList.toggle('hidden');
  });
});
var filterSizes = document.querySelector('.filterSizes');
var filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
  filterSizes.classList.toggle('hidden');
}); //Находим span над карзиной, который будет меняться при добавлении товаров в корзину

var cartCount = document.querySelector('#cartCount'); //Находим все кнопки Add to Cart

var btnToCart = document.querySelectorAll('#btnToCart'); //Находим саму карзину, при нажатии на которую, будет расскрываться блок с товарами

var btnCart = document.querySelector('.cartIcon'); // Находим все карточки товаров

var featuredItems = document.querySelectorAll('.featuredItem'); // Код для вывода числа позиций в корзине.
//Отображается в розовом круге над иконкой карзины

var count = 0;
/*
btnToCart.forEach(el => {
    el.addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        cartCount.style.display = "inline-block";
    })
})*/

featuredItems.forEach(function (el) {
  el.addEventListener('click', function (event) {
    if (event.target.id !== 'btnToCart') {
      return;
    } else {
      count++;
      cartCount.textContent = count;
      cartCount.style.display = "inline-block";
    }
  });
});