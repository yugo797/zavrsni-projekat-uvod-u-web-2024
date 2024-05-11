"use strict";
const loadmoreBtn = document.getElementsByClassName("loadMoreProducts")[0];
const gameProduct = document.querySelector(".products");
const srcBtn = document.querySelector(".srcBtn");
const inputTxt = document.querySelector(".inputSearch");

let i = 0;
function generateCard(id, thumbnail, name, price) {
  return `
        <div class="single-product">
        <img
        src="${thumbnail}"
        alt="${id}"
        />
        <div class="game-data">
            <h3>${name}</h3>
            <span>${price}$</span>
            <button>Read More</button>
        </div>
        </div>`;
}

function generateProduct() {
  fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice>=0")
    .then((rez) => rez.json())
    .then((data) => {
      for (let j = i; j < i + 3; j++) {
        gameProduct.innerHTML += generateCard(
          data[j].internalName,
          data[j].thumb,
          data[j].title,
          data[j].normalPrice
        );
      }
      i += 3;
    });
}

function searchFunct(srcQuery) {
  console.log(`Searching for ${srcQuery}`);
  gameProduct.innerHTML = "";
  fetch(`https://www.cheapshark.com/api/1.0/games?title=${srcQuery}`)
    .then((rez) => rez.json())
    .then((data) => {
      for (let j = 0; j < data.length; j++) {
        gameProduct.innerHTML += generateCard(
          data[j].internalName,
          data[j].thumb,
          data[j].external,
          data[j].cheapest
        );
      }
    });
}

window.onload = generateProduct;
loadmoreBtn.addEventListener("click", generateProduct);

srcBtn.addEventListener("click", function () {
  const searchValue = inputTxt.value;
  searchFunct(searchValue);
});
