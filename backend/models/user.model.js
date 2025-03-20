const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    mobile: Number,
    role: { type: String, enum: ["student", "admin", "Class teacher"], default: "student" },
    password: String
})




const User = new mongoose.model("User", userSchema);


module.exports = User;