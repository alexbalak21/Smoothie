const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//SIGNUP ROUTES
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

//LOGIN ROUTES
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
