const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    userMobNo: { type: String, required: true },
    userEmail: { type: String, required: true },
    userAdd: { type: String, required: true }
})

module.exports = mongoose.model("User", userSchema);