require("dotenv").config()
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const db = require("./config/db")

const app = express()

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

// User routes
app.use(require('./routes/UserRoutes'))

db.then(() => {
    console.log('db connected');
    app.listen(4400, () => console.log("working on port 4400"))
}).catch((e) => {
    console.log("Error : ", e.message)
})
