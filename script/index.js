"use strict";
const loadmoreBtn = document.getElementsByClassName("loadMoreProducts")[0];
const gameProduct = document.querySelector(".products");
const srcBtn = document.querySelector(".srcBtn");
const inputTxt = document.querySelector(".inputSearch");

//modal
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalData = document.querySelector(".modal-data");
const modalCloseButton = document.querySelector(".modal-close-button");
//modal

let i = 0;
function generateCard(gameID, id, thumbnail, name, price) {
  return `
        <div class="single-product">
        <img
          src="${thumbnail}"
          alt="${id}"
        />
        <div class="product-id">
        <div class="game-data">
            <h3>${name}</h3>
            <span>${price}$</span>
            <button class="modalWindOpener" data-gameid="${gameID}">Read More</button>
        </div>
        </div>`;
}

function generateProduct() {
  fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice>=0")
    .then((rez) => rez.json())
    .then((data) => {
      for (let j = i; j < i + 3; j++) {
        gameProduct.innerHTML += generateCard(
          data[j].gameID,
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
          data[j].gameID,
          data[j].internalName,
          data[j].thumb,
          data[j].external,
          data[j].cheapest
        );
      }
    });
}

//modal
function generateModalCard(
  thumb,
  internalName,
  steamAppID,
  cheapest,
  external
) {
  return `
          <div class="modal-card">
          <img src="${thumb}" alt="${internalName}" class="modal-card-image">
          <div class="modal-card-info">
            <h3>${internalName}</h3>
            <p>Steam App ID: ${steamAppID || "N/A"}</p>
            <p>Cheapest Deal: ${cheapest}$</p>
            <a href="${external}" target="_blank">View on Store</a>
          </div>
        </div>
  `;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modalWindOpener")) {
    const gameID = event.target.dataset.gameid;
    fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`)
      .then((response) => response.json())
      .then((gameData) => {
        console.log(gameData);
        modalContent.querySelector(".modal-header h2").textContent =
          gameData.internalName;
        modalData.innerHTML = generateModalCard(
          gameData.info.thumb,
          gameData.info.title,
          gameData.info.steamAppID,
          gameData.cheapestPriceEver.price,
          gameData.info.title
        );
        openModal();
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }
});

function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  modalData.innerHTML = "";
}

modalCloseButton.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

//modal e nd
window.onload = generateProduct;
loadmoreBtn.addEventListener("click", generateProduct);

srcBtn.addEventListener("click", function () {
  loadmoreBtn.classList.add("hidden");
  const searchValue = inputTxt.value;
  searchFunct(searchValue);
});
