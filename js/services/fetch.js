/*FetchData*/
const fetchData = (bodyData, URL_POST_FORM) => {
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
/*FetchCurrencyExchange: ASYNC AWAIT*/
// const promise = fetch(URL_CURRENCY_EXCHANGE)
// .then(response => response.json())
// .then(data => {
//   if (currencie === "eur") {
//     rateBasic.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.basic).toFixed(2));
//     rateProfessional.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.professional).toFixed(2));
//     ratePremium.innerText = "€" + testNumbersDecimals((data.usd.eur * PRICES.premium).toFixed(2));
//   } else if (currencie === "gbp") {
//     rateBasic.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.basic).toFixed(2));
//     rateProfessional.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.professional).toFixed(2));
//     ratePremium.innerText = "£" + testNumbersDecimals((data.usd.gbp * PRICES.premium).toFixed(2));
//   } else {
//     rateBasic.innerText = "$" + PRICES.basic;
//     rateProfessional.innerText = "$" + PRICES.professional;
//     ratePremium.innerText = "$" + PRICES.premium;
//   }
// });
export default fetchData;