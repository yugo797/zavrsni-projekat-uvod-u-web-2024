"use strict";
const loadmoreBtn = document.getElementsByClassName("loadMoreProducts")[0];
const gameProduct = document.querySelector(".products");

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
            <button>add to cart</button>
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

window.onload = generateProduct;
loadmoreBtn.addEventListener("click", generateProduct);
