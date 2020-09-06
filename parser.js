let Nightmare = require("nightmare");
let nightmare = new Nightmare();
let [_, __, url, minPrice] = process.argv;

async function checkPrice() {
  let priceString = await nightmare
    .goto(url)
    .wait("#priceblock_ourprice") //await till this element show up into the DOM
    .evaluate(() => {
      let price = document.getElementById("priceblock_ourprice").innerText;

      return price;
    })
    .end();
  let price = parseFloat(priceString.replace(/\$|,/g, ""));
  if (price < parseFloat(minPrice)) {
    console.log("its cheap ");
  } else {
    console.log("its still expensive");
  }
}

checkPrice();
