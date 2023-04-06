const express = require("express");
const router = express.Router();

const loggedFilter = require("../middleware/loggedFilter");

const userRoutes = require("./user");

router.use("/user", userRoutes);

module.exports = router;
