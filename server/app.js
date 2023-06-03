const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();

// Serve the Angular app
app.use(express.static(path.join(__dirname, "../dist/scraping-app")));

app.get("/api/scrape", async (req, res) => {
  try {
    const response = await axios.get("https://wltest.dns-systems.net/");
    const products = scrapeProducts(response.data);
    const sortedProducts = sortProductsByPrice(products);
    const jsonResult = createJsonResult(sortedProducts);
    console.log("jsonResult", jsonResult);
    res.json(jsonResult);
  } catch (error) {
    console.error("An error occurred while scraping the website:", error);
    res.status(500).json({ error: "Failed to scrape the website" });
  }
});

// Serve the Angular app for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/scraping-app/index.html"));
});

const scrapeProducts = (html) => {
  const $ = loadHtml(html);
  const products = $(".package")
    .map((index, element) => {
      const $element = $(element);
      const title = getTrimmedText($element.find("h3"));
      const description = $element
        .find(".package-description")
        .html()
        .replace(/<br>/g, " ");
      const $packagePrice = $element.find(".package-price");
      const price = getAnnualPrice($element, $packagePrice);
      const discount = getDiscountAmount(
        getTrimmedText($packagePrice.find("p"))
      );

      return {
        title,
        description,
        price,
        discount,
      };
    })
    .get();

  return products;
};

const loadHtml = (html) => {
  try {
    return cheerio.load(html);
  } catch (error) {
    console.error("An error occurred while parsing HTML:", error);
    throw new Error("Failed to parse HTML");
  }
};

const getTrimmedText = ($element) => {
  return $element.text().trim();
};

const getAnnualPrice = ($element, $packagePrice) => {
  const priceText = getTrimmedText($element.find(".price-big")).substring(1);
  const annualPrice = parseFloat(priceText) * 12;
  return getTrimmedText($packagePrice).includes("Month")
    ? annualPrice
    : priceText;
};

const getDiscountAmount = (text) => {
  const regex = /£(\d+\.\d+)/;
  const match = text.match(regex);
  return match ? match[0] : null;
};

const sortProductsByPrice = (products) => {
  return products
    .sort((a, b) => b.price - a.price)
    .map((product) => ({
      ...product,
      price: `£${product.price}`,
    }));
};

const createJsonResult = (products) => {
  return {
    results: products,
  };
};

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = { app, server };
