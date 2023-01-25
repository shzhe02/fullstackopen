const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("id property is present", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
})

test("a new blog can be added", async () => {
  const newBlog = {
    title: "Tester Four",
    author: "Fourth Tester",
    url: "testerfour.com",
    likes: 4,
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const result = await helper.blogsInDb()
  expect(result).toHaveLength(helper.initialBlogs.length + 1)
  const titles = result.map((n) => n.title)
  expect(titles).toContain("Tester Four")
})

afterAll(async () => {
  await mongoose.connection.close()
})
