let Nightmare = require("nightmare");
let nightmare = new Nightmare();
let [_, __, url, minPrice] = process.argv;

async function checkPrice() {
  let priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice") //We await till this element show up into the DOM
    .evaluate(() => {
      let price = document.getElementById("priceblock_ourprice").innerText;
      //do not put any console..log here because this code is running some where else just return the result
      return price;
    })
    .end(); //we have to end it
  let price = parseFloat(priceString.replace(/\$|,/g, ""));
  if (price < parseFloat(minPrice)) {
    console.log("its cheap ");
  } else {
    console.log("its still expensive");
  }
}

checkPrice();
