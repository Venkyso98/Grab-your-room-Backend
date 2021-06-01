const express = require("express");
const userController = require("../Controllers/UserController");
const router = express.Router();

router.post("/registeruser", userController.registerUser);
router.get("/getSingleUser/:id", userController.getSingleUser);

module.exports = router;
