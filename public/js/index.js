/*eslint-disable*/
import { login, logout, signup } from "./login";
import { displayMap } from "./mapbox";
import { updateSettings } from "./updateSettings";
import { bookTour } from "./stripe";
import { showAlert } from "./alerts";

//DOM elements
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const logoutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const bookBtn = document.getElementById("book-tour");

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (userDataForm) {
  userDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-settings").textContent = "Updating...";
    const form = new FormData();
    form.append("photo", document.getElementById("photo").files[0]);
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    await updateSettings(form, "data");
    document.querySelector(".btn--save-settings").textContent = "Save settings";
    location.reload();
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password",
    );
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

if (bookBtn)
  bookBtn.addEventListener("click", (e) => {
    e.target.textContent = "Processing...";
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector("body").dataset.alert;

if (alertMessage) showAlert("success", alertMessage, 20);
