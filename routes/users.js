const router = require("express").Router();

const {
  getUsers,
  getUserById,
  postUsers,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:_id", getUserById);

router.patch("/users/me", updateUserProfile);

router.patch("/users/me/avatar", updateUserAvatar);

router.post("/users", postUsers);

module.exports = router;
