const mongoose = require("mongoose");

const url = new URL(process.env.MONGO_DB_URL)

module.exports = mongoose.connect(url.href);