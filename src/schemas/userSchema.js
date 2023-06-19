const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userdata");

const users = new mongoose.Schema({
    usern: String,
    phone : String,
    email: String,
    pass : String
});

module.exports = mongoose.model("mycoll", users);