import {URL_POST_FORM, URL_CURRENCY_EXCHANGE, REGEXP_DECIMALS, PRICES} from "../variables/constants.js";
/*FetchData*/
const fetchData = (bodyData) => {
    return (
        fetch(URL_POST_FORM, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
)}
/*FetchCurrencyExchange:*/
const changeCoin = (currencie, rateBasic, rateProfessional, ratePremium) => {
  fetch(URL_CURRENCY_EXCHANGE)
  .then(response => response.json())
  .then(data => {
    if (currencie === "eur") {
      rateBasic.innerText = "€" + numberToDecimal((data.usd.eur * PRICES.basic).toFixed(2));
      rateProfessional.innerText = "€" + numberToDecimal((data.usd.eur * PRICES.professional).toFixed(2));
      ratePremium.innerText = "€" + numberToDecimal((data.usd.eur * PRICES.premium).toFixed(2));
    } else if (currencie === "gbp") {
      rateBasic.innerText = "£" + numberToDecimal((data.usd.gbp * PRICES.basic).toFixed(2));
      rateProfessional.innerText = "£" + numberToDecimal((data.usd.gbp * PRICES.professional).toFixed(2));
      ratePremium.innerText = "£" + numberToDecimal((data.usd.gbp * PRICES.premium).toFixed(2));
    } else {
      rateBasic.innerText = "$" + PRICES.basic;
      rateProfessional.innerText = "$" + PRICES.professional;
      ratePremium.innerText = "$" + PRICES.premium;
    }
  });
};
/*numberToDecimal*/
function numberToDecimal(n) {
  let numberString = n.toString();
  let index = numberString.indexOf(".");
  if (REGEXP_DECIMALS.test(numberString)) {
    n = (numberString.substring(0, index));
  }
  return n;
};
export {fetchData, changeCoin, numberToDecimal};