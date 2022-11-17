import fetchData from "./services/fetch.js";
import {URL_POST_FORM, URL_CURRENCY_EXCHANGE, PRICES} from "./variables/constants.js";
/*BurgerMenu*/
document.getElementById("nav__checkbox").addEventListener("click", function () {
  if (document.getElementById("nav__options").style.display == "block") {
    document.getElementById("nav__options").style.display = "none"
    document.getElementById("closedmenu").style.display = "none"
    document.getElementById("openmenu").style.display = "block"
  } else {
    document.getElementById("nav__options").style.display = "block"
    document.getElementById("closedmenu").style.display = "block"
    document.getElementById("openmenu").style.display = "none"
  }
});
/*Scrollbar*/
const scrollbar = document.querySelector(".scrollbar");
window.addEventListener("scroll", () => {
  let currentPosition = window.pageYOffset;
  let scrollPercent = (currentPosition * 100) / (document.body.offsetHeight - window.innerHeight);
  setScrollPopup(scrollPercent);
  scrollbar.style.width = scrollPercent + "%";
});
/*ReturnTop*/
const returnButton = document.querySelector(".return__button").addEventListener("click", () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }, 200);
});
/*FormValidation*/
const inputName = document.querySelector(".clientname");
let validName;
const validationName = () => {
  if (inputName.value.length <= 2 || inputName.value.length >= 100) {
    inputName.style.borderColor = "red";
    validName = false;
  } else {
    inputName.style.borderColor = "#08A6E4";
    validName = true;
  }
};
inputName.addEventListener("click", validationName);
inputName.addEventListener("keyup", validationName);
const inputEmail = document.querySelector(".clientemail");
let validEmail = false;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validationEmail = () => {
  if (!emailRegex.test(inputEmail.value) || inputEmail.value == "") {
    inputEmail.style.borderColor = "red";
    validEmail = false;
  } else {
    inputEmail.style.borderColor = "#08A6E4";
    validEmail = true;
  }
};
inputEmail.addEventListener("click", validationEmail);
inputEmail.addEventListener("keyup", validationEmail);
let inputCheckBox = document.querySelector(".checkbox");
inputCheckBox.addEventListener("click", () => {
  inputCheckBox.checked = true;
});
/*Send the form data to the server*/
const submitButton = document.querySelector(".button__submit");
submitButton.addEventListener("click", (e) => {
  if (validName && validEmail && inputCheckBox.checked) {
    e.preventDefault();
    const bodyData = {name: inputName.value, email: inputEmail.value, consentGiven: inputCheckBox.checked}
    fetchData(bodyData, URL_POST_FORM);
    inputName.value = "";
    inputEmail.value = "";
    inputCheckBox.checked = false;
    window.alert("We will contact you as soon as possible");
  } else {
    window.alert("Fill in all the fields to send the form");
  }
});
/*PopUp after 5 seconds*/
const popupContainer = document.querySelector(".popup__container");
const popup = document.querySelector(".popup");
setTimeout(() => {
  if (!localStorage.getItem("popupState")) {
    popup.classList.add("popup-active");
    popupContainer.classList.add("popup__container-active");
  }
}, 5000);
/*PopUp after scroll more than 25%*/
function setScrollPopup(percent) {
  if (percent >= 25 && !localStorage.getItem("popupState")) {
    popup.classList.add("popup-active");
    popupContainer.classList.add("popup__container-active");
  }
}
/*Validate information from PopUp*/
const popupEmail = document.querySelector(".popup__email");
let validPopupEmail = false;
const validationPopupEmail = () => {
  if (!emailRegex.test(popupEmail.value) || popupEmail.value == "") {
    popupEmail.style.borderColor = "red";
    validPopupEmail = false;
  } else {
    popupEmail.style.borderColor = "#08A6E4";
    validPopupEmail = true;
  }
};
popupEmail.addEventListener("click", validationPopupEmail);
popupEmail.addEventListener("keyup", validationPopupEmail);
const popupCheckBox = document.querySelector(".popup__checkbox");
popupCheckBox.addEventListener("change", () => {
  popupCheckBox.checked = true;
});
/*Send the popup form data to the server*/
const popupButton = document.querySelector(".popup__submit");
popupButton.addEventListener("click", (e) => {
  if (popupEmail.value && popupCheckBox.checked) {
    e.preventDefault();
    const bodyData = {email: popupEmail.value, consentGiven: popupCheckBox.checked}
    fetchData(bodyData, URL_POST_FORM)
      .then(popup.classList.remove("popup-active"))
      .then(popupContainer.classList.remove("popup__container-active"))
      window.alert("Thanks for subscribing");
  } else {
    window.alert("Complete all the fields to subscribe correctly");
  }
});
/*Popup close using cross*/
document.querySelector(".popup__cross").addEventListener("click", () => {
  popup.classList.remove("popup-active");
  popupContainer.classList.remove("popup__container-active");
  localStorage.setItem("popupState", "1");
});
/*Popup close using ESC*/
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    popup.classList.remove("popup-active");
    popupContainer.classList.remove("popup__container-active");
  }
  localStorage.setItem("popupState", "1");
});
/*Popup close clicking outside the modal*/
window.addEventListener("click", (e) => {
  if (!popup.contains(e.target)) {
    popup.classList.remove("popup-active");
    popupContainer.classList.remove("popup__container-active");
    localStorage.setItem("popupState", "1");
  }
});
/*CurrencySelector*/
document.querySelector(".pricing__select").addEventListener("change", (e) => {
  let currencie = (e.target.value).toLowerCase();
  let rateBasic = (document.querySelector(".pricing__basic"));
  let rateProfessional = document.querySelector(".pricing__professional");
  let ratePremium = document.querySelector(".pricing__premium");
  const promise = fetch(URL_CURRENCY_EXCHANGE)
    .then(response => response.json())
    .then(data => {
      if (currencie === "eur") {
        rateBasic.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.basic).toFixed(2));
        rateProfessional.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.professional).toFixed(2));
        ratePremium.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.premium).toFixed(2));
      } else if (currencie === "gbp") {
        rateBasic.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.basic).toFixed(2));
        rateProfessional.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.professional).toFixed(2));
        ratePremium.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.premium).toFixed(2));
      } else {
        rateBasic.innerText = "$" + PRICES.basic;
        rateProfessional.innerText = "$" + PRICES.professional;
        ratePremium.innerText = "$" + PRICES.premium;
      }
    });
});
function testNumbersDecimals(n) {
  const REGEXP_DECIMALS = /.\.00/;
  let numberString = n.toString();
  let index = numberString.indexOf(".");
  if (REGEXP_DECIMALS.test(numberString)) {
      n = (numberString.substring(0, index));
  }
  return n;
};
/*Slider*/
let index = 0;
let slides = document.getElementsByClassName("slider__img");
let buttons = document.getElementsByClassName("slider__button");
/*Show the actual photo*/
function showSlide(n) {
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      buttons[i].classList.remove("slider__button-active");
  }
  slides[n].style.display = "block";
  buttons[n].classList.add("slider__button-active");
}
/*Increase or decrease the index of the slide*/
function nextSlide(n) {
  index += n;
  if (index >= slides.length) {
      index = 0;
  }
  if (index < 0) {
      index = slides.length - 1;
  }
  showSlide(index);
}
/*Show the previous photo*/
document.querySelector(".arrow-left").addEventListener("click", () => {
  nextSlide(-1);
})
/*Show the next photo*/
document.querySelector(".arrow-right").addEventListener("click", () => {
  nextSlide(1);
})
/*Show photo when button is clicked*/
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
      showSlide(i);
  });
};