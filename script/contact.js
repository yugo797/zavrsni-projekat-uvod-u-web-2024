"use strict";

const submitBtn = document.querySelector(".submit");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close__modal");
const nameField = document.querySelector(".name");
const emailField = document.querySelector(".email");
const messageField = document.querySelector(".message");
const modalTitle = document.querySelector("#modal__title");
const modalMessage = document.querySelector("#modal__message");
const myForm = document.getElementById("myForm");
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
    console.log(nameField.value, emailField.value, messageField.value);
    if (nameField.value==="" || emailField.value==="" || messageField.value==="") {
        modalTitle.innerHTML="Error!";
        modalMessage.innerHTML="Please fill in all the fields.";
    }
    else if (nameField.value!=="" && emailField.value!=="" && messageField.value!==""){
        modalTitle.innerHTML="Thank you!";
        modalMessage.innerHTML="Successfully sent a message!";
        check=true;
    }
    event.preventDefault();
};

submitBtn.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    
  }
});