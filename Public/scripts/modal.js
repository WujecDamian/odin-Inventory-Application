import cloudinaryController from "../../Controllers/cloudinaryController";

const addBtn = document.querySelector(".add__category__btn");
const closeBtn = document.querySelector(".close__btn");
const submitBtn = document.querySelector(".submit__btn");
const modal = document.querySelector(".form__modal");
const imageUrl = "";

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
submitBtn.addEventListener("click", cloudinaryController.uploadImage());
