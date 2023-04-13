const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    key: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("Token", tokenSchema);
