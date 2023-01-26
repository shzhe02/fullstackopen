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

test("likes property defaults to 0", async () => {
  const newBlog = {
    title: "Tester Four",
    author: "Fourth Tester",
    url: "testerfour.com",
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const result = await helper.blogsInDb()
  const recentlyAdded = result.find((e) => e.title === "Tester Four")
  expect(recentlyAdded.likes).toBeDefined()
})

test("request marked as 400 if title field is not present", async () => {
  const missingTitle = {
    author: "Fourth Tester",
    url: "testerfour.com",
    likes: 4,
  }
  await api.post("/api/blogs").send(missingTitle).expect(400)
})

test("request marked as 400 if url field is not present", async () => {
  const missingUrl = {
    title: "Tester Five",
    author: "Fifth Tester",
    likes: 5,
  }
  await api.post("/api/blogs").send(missingUrl).expect(400)
})

test("deleting by id works", async () => {
  const newBlog = {
    title: "Tester Six",
    author: "Sixth Tester",
    url: "testersix.com",
    likes: 6,
  }
  await api.post("/api/blogs").send(newBlog).expect(201)
  const before = await helper.blogsInDb()
  const added = before.find((blog) => blog.title === "Tester Six")
  expect(added).toBeDefined()
  await api.delete(`/api/blogs/${added.id}`).expect(204)
  const after = await helper.blogsInDb()
  const deleted = after.find((blog) => blog.title === "Tester Six")
  expect(deleted).not.toBeDefined()
})

test("updating a blog works", async () => {
  const initial = {
    title: "Tester Seven",
    author: "Seventh Tester",
    url: "testerseven.com",
    likes: 0,
  }
  const updated = {
    title: "Tester Seven",
    author: "Seventh Tester",
    url: "testerseven.com",
    likes: 7,
  }
  await api.post("/api/blogs").send(initial).expect(201)
  const before = await helper.blogsInDb()
  const added = before.find((blog) => blog.title === "Tester Seven")
  expect(added.likes).toBe(0)
  await api.put(`/api/blogs/${added.id}`).send(updated)
  const after = await helper.blogsInDb()
  expect(after.find((blog) => blog.title === "Tester Seven").likes).toBe(7)
})

afterAll(async () => {
  await mongoose.connection.close()
})
