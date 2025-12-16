require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const routes = require("./routes")
const cors = require('cors')



app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use( '/api',routes)
app.use( '/api/twet' , express.static("./uploads"))


const url = process.env.DB_CONNECTION_URL
console.log(url)

mongoose.connect(url)
.then(() => console.log("Database is conected!!!!!!"))
.catch((err) => console.log(err.message))

const port = process.env.PORT || 5000
app.listen(port , () => console.log(`server running on port ${port}`))