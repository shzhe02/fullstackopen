const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const mongoose = require("mongoose")

//const mongoUrl = "mongodb://localhost/bloglist"
mongoose.connect(config.MONGO_URL)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app
