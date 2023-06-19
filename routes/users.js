const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");
let users = "";

try {
  const data = fs.readFileSync(filePath, { encoding: "utf8" });
  users = JSON.parse(data);
} catch (err) {
  throw new Error(err);
}

router.get("/users", (req, res) => {
  res.send(users);
});

router.get("/users/:_id", (req, res) => {
  const user = users.find((item) => item._id === req.params._id);

  if (!user) {
    res.status(404).send({ error: "ID do usuário não encontrado" });
    return;
  }

  res.send(user);
});

module.exports = router;
