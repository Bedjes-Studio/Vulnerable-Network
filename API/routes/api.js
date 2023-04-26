const express = require("express");
const router = express.Router();


const userRoutes = require("./user");
const fileRoutes = require("./file");

router.use("/user", userRoutes);
router.use("/file", fileRoutes);

module.exports = router;
