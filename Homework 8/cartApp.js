"use strict"

const products = [
   {
      id: 1,   
      nameOne: "Product 1",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 52.00.toFixed(2)
   },
   {
      id: 2,
      nameOne: "Product 2",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 62.00.toFixed(2)
   },
   {
      id: 3,
      nameOne: "Product 3",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 72.00.toFixed(2)
   },
   {
      id: 4,
      nameOne: "Product 4",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 82.00.toFixed(2)
   },
   {
      id: 5,
      nameOne: "Product 5",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 22.00.toFixed(2)
   },
   {
      id: 6,
      nameOne: "Product 6",
      nameTwo: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      count: 1,
      price: 32.00.toFixed(2)
   },
]

// Нахожу куда буду складывать карточки товаров и складываю их в контейнер с помощью цикла
let featuredItems = document.querySelector('.featuredItems'); 
for (let good of products) {
   featuredItems.insertAdjacentHTML('beforeend', makeGoodItem(good.id, good.nameTwo, good.text, good.price));
}

/**
 * Создаёт разметку для карточек
 * @param {*} id - Id объекта 
 * @param {*} name - Название карточки 
 * @param {*} text - Описание товара
 * @param {*} price - Цена товара 
 * @returns 
 */
function makeGoodItem (id, name, text, price) {	
   return `
      <div class="featuredItem">
         <div class="featuredImgWrap">
            <img src="images/featured/${id}.jpg" alt="">
            <div class="featuredImgDark">
               <button id="btnToCart" data-id=${id}>
                  <img src="images/cart.svg" alt=""> Add to Cart
               </button>
            </div>
         </div>
         <div class="featuredData">
            <div class="featuredName">
               ${name}
            </div>
            <div class="featuredText">
               ${text}
            </div>
            <div class="featuredPrice">
               $${price}
            </div>
         </div>
      </div>`
}

//Находим span над карзиной, который будет меняться при добавлении товаров в корзину
let cartCount = document.querySelector('#cartCount');

//Находим все кнопки Add to Cart
let btnToCart = document.querySelectorAll('#btnToCart');

//Находим саму карзину, при нажатии на которую, будет расскрываться блок с товарами
let btnCart = document.querySelector('.cartIcon');

//Находим контейнер корзины, который будет выпадать при нажатии на иконку корзины
let basket = document.querySelector('.basket');

// Находим все карточки товаров
let featuredItem = document.querySelectorAll('.featuredItem');

// Находим куда будем скдажывать выбранные товары
let basketContainer = document.querySelector('.basketContainer');



/**
 * Вешаю обработчик события на иконку карзины
 *  для отображения контейнера корзины при нажатии на иконку
 * Если В корзине ничего нет то открытия при клике на иконку карзины не произойдёт
 */
btnCart.addEventListener('click', el => {
   if (!el.target.classList.contains('cartIcon')) {
      return
   }
   if (basket.classList.contains('hidden') & cartCount.textContent > '0') {
      basket.classList.remove('hidden');
   } else {
      basket.classList.add('hidden');
   }
})

let countSpan = 0;
let basketItems = {};

/**
 * 1. Пробегаюсь по карточкам товаров и вешаю на каждую кнопку Add to Cart обработчик события.
 * 2. При нажатии увеличиваем счетчик countSpan. Этот счётчик использую для отображения над иконкой карзины. 
 * 3. Далее запускается цикля для проверки соответсвия  id нажатой кнопки у карточки с id, которые есть в массиве с карточками.
 * 4. При соответсвии добавляем этот товар в объект basketItems с помощью функции AddToCart.
 * 5. Далее запускается цикл для рендера в контейнере корзины с помощью функции renderCart
 */
featuredItem.forEach(el => {
   el.addEventListener('click', event => {
      if (event.target.id !== 'btnToCart') {
         return
      } else {
         countSpan++;
         cartCount.textContent = countSpan;
      }
      for (let good of products) {
         if (event.target.dataset.id == good.id) {
            addToCart (good.id, good.nameOne, good.price, good.count);
         }
      }
      let goods = Object.values(basketItems);
      for (let i = 0; i < goods.length; i++) {
            renderCart (goods[i].id, goods[i].name, goods[i].count, goods[i].price);   
      }
   })
})

// Нахожу div куда положу полную стоимость товаров, которые находяться в корзине
let totalPrice = document.getElementById('basketTotalValue');


/**
 * 1. Функция проверяет вложенные объекты на повторение. Если есть повторение, то увеличиваем их количество,
 * если же нет, то создается новый объект
 * 2. После проверки считаем полную стоимость товаров находящиеся в объекте карзины с помощью sumTotalPrice 
 */
function addToCart (id, name, price, count) {
   if (!(id in basketItems)) {
      basketItems[id] = {id, name, price, count};
   } else {
      (basketItems[id].count)++;
   }
   totalPrice.textContent = sumTotalPrice ().toFixed(2);
}

/**
 * 
 * @returns Считаем полную стоимость всех товаров
 */
function sumTotalPrice () {
   let arr = Object.values(basketItems);
   let sum = 0;
   for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i].price * arr[i].count;
   }
   return sum;
}

/**
 * 1. Функция сначала ищит повторения по id
 * 2. Если такого нет, то запускает функция для рендера разметки товаров в корзине
 * 3. Если есть то пропускает рендер разметки и меняет количество уже имеющегося товара
 * и пересчитывает стоимость по каждой позиции 
 */
function renderCart (id, name, count, price) {
   let basketItem = document.getElementById(`${id}`)
   if (!(basketItem)) {
      return renderGoodsInCart (id, name, count, price);
   }
   basketItem.querySelector('.basketItemCount').textContent = count;
   basketItem.querySelector('.basketItemTotal').textContent = count * price; 
}

/**
 * Функция строит разметку для карточек купленных товаров и добавляет их в контейнер корзины
 */
function renderGoodsInCart (id, name, count, price) {
   const productRow = `
      <div class="basketItem" id=${id}>
         <div>${name}</div>
            <div>
               <span class="basketItemCount">${count}</span> шт
            </div>
            <div>$${price}</div>
            <div>
               $<span class="basketItemTotal">${(price * count).toFixed(2)}</span>
         </div>
      </div>
   `;
   basketContainer.insertAdjacentHTML('beforeend', productRow); 
}  



