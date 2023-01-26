const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (_, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  // Input verification
  if (!(username && password)) {
    return response.status(400).json({
      error: "username or password missing",
    })
  } else if (username.length <= 3 || password.lenth <= 3) {
    return response.status(400).json({
      error:
        "either username or password is too short; they must be more than 3 characters long",
    })
  }

  const existingUsernames = (await User.find({})).map((e) => e.username)
  if (existingUsernames.includes(username)) {
    return response.status(400).json({
      error: "Username is already in use",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    blogs: [],
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
