const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.post("/updateCreditCard", userCtrl.updateCreditCard);
router.post("/generateResetToken", userCtrl.generateResetToken);
router.post("/resetPassword", userCtrl.resetPassword);

module.exports = router;
