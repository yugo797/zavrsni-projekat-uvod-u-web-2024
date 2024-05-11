"use strict";

const gameProduct = document.querySelector(".products");

function generateProduct(id, thumbnail, name, price) {
  return `
    <div class="single-product">
    <img
      src="${thumbnail}"
      alt="${id}"
    />
    <div class="game-data">
      <h3>${name}</h3>
      <span>${price}</span>
      <button>add to cart</button>
    </div>
  </div>`;
}

fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50")
  .then((rez) => rez.json())
  .then((data) => {
    for (let i = 0; i < 13; i++) {
      gameProduct.innerHTML += generateProduct(
        data[i].internalName,
        data[i].thumb,
        data[i].external,
        data[i].cheapest
      );
    }
  });
