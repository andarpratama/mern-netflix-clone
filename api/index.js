const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongoURL = process.env.MONGO_URL_LOCAL
mongoose.set("strictQuery", false);
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log("DB Connection Successfull"))
    .catch(err => console.log(err))

app.listen(8080, ()=> {
    console.log('Backend server is running!')
})
