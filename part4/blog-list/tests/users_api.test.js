const bcrypt = require("bcrypt")
const supertest = require("supertest")
const User = require("../models/user")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

describe("User creation", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("somepass", 10)
    const user = new User({ username: "first", passwordHash })

    await user.save()
  })

  test("User can be created normally", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "second",
      name: "Two",
      password: "numbertwo",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test("User will not be created if username or password is not given", async () => {
    const usersAtStart = await helper.usersInDb()

    const missingUsername = {
      name: "Three",
      password: "numberthree",
    }
    const missingPassword = {
      username: "fourth",
      name: "Four",
    }

    await api.post("/api/users").send(missingUsername).expect(400)
    await api.post("/api/users").send(missingPassword).expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart).toEqual(usersAtEnd)
  })

  test("User will not be created if username is already in use", async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "fourth",
      name: "Four",
      password: "numberfour",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    await api.post("/api/users").send(newUser).expect(400)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })
})
