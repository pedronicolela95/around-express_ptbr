// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");

const { PORT = 3000 } = process.env;

const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");

const app = express();

app.use(userRoute);
app.use(cardRoute);

app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.use((err, req, res) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).send({ message: "Um erro ocorreu no servidor" });
});

app.listen(PORT);
