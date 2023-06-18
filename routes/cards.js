// eslint-disable-next-line import/no-extraneous-dependencies
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/cards.json");
let cards = "";

try {
  const data = fs.readFileSync(filePath, { encoding: "utf8" });
  cards = JSON.parse(data);
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}

router.get("/cards", (req, res) => {
  res.send(cards);
});

module.exports = router;
