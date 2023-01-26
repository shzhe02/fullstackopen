const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post("/", (request, response) => {
  const blog = request.body
  if (blog.title && blog.url) {
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes || 0,
    })

    const savedBlog = newBlog.save()
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
