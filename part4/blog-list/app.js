const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")

//const mongoUrl = "mongodb://localhost/bloglist"
mongoose.connect(config.MONGO_URL)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

module.exports = app
