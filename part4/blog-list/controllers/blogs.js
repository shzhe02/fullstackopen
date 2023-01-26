const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const blog = request.body
  if (blog.title && blog.url) {
    const users = await User.find({})
    const randomUser = users[0]
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
      user: randomUser._id,
    })
    const savedBlog = await newBlog.save()
    console.log(randomUser)
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    console.log(randomUser)
    await randomUser.save()
    response.status(201).json(savedBlog)
  }
  response.status(400).end()
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
