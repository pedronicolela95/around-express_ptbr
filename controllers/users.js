const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => res.status(500).send({ message: "Ocorreu um erro no servidor" }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        const error = new Error("Nenhum cartão encontrado com esse id");
        error.statusCode = 404;
        error.name = "NotFoundError";
        throw error;
      }
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(400).send({ message: "Formato de ID não válido" });
      }
      if (error.name === "NotFoundError") {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};
