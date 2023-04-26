const express = require("express");
const router = express.Router();

const fileCtrl = require("../controllers/file");
const loggedFilter = require("../middleware/loggedFilter");

router.post("/updateConfig", loggedFilter, fileCtrl.updateConfig);

module.exports = router;
