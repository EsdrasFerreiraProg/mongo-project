const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    date: String,
    body: String
});

module.exports = mongoose.model("dias", userSchema);