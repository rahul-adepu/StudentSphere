const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    mobile: Number,
    role: { type: String, enum: ["User", "admin", "Class teacher"], default: "User" },
    password: String
})




const User = new mongoose.model("User", userSchema);


module.exports = User;