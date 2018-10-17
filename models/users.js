const mongoose = require("mongoose");
const Photo = require("./photos")

const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    location: String,
    username: String,
    password: String,
    photos: [Photo.schema]
})

const User = mongoose.model("User", userSchema);
module.exports = User;