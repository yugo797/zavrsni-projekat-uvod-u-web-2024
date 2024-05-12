"use strict";

const myForm = document.getElementById("myForm");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close__modal");
const subButton = document.querySelector(".submit");
const mName = document.querySelector(".name");
const email = document.querySelector(".email");
const messageField = document.querySelector(".message");
const title = document.querySelector("#modal__title");
const message = document.querySelector("#modal__message");
var check = false;

const closeModal = () => {
  modal.classList.add("hidden");

  if(check==true){
    check=false;
    window.location.href = "index.html";
}

};

const openModal = (event) => {
    modal.classList.remove("hidden");
    console.log(mName.value, email.value, messageField.value);
    if (mName.value==="" || email.value==="" || messageField.value==="") {
        title.innerHTML="Warning!";
        message.innerHTML="Incorrect form";
    }
    else if (mName.value!=="" && email.value!=="" && messageField.value!==""){
        title.innerHTML="Success!";
        message.innerHTML="Message sent!";
        check=true;
    }
    event.preventDefault();
};

subButton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    
  }
});