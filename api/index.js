const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
dotenv.config()

const mongoURL = process.env.MONGO_URL_LOCAL
mongoose.set("strictQuery", false);
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log("DB Connection Successfull"))
    .catch(err => console.log(err))

app.use(express.json())
app.use('/api/auth/', authRoute)
app.listen(process.env.PORT, ()=> {
    console.log(`Running on port http://localhost:${process.env.PORT}`)
})
