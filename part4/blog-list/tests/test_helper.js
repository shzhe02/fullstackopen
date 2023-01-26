const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "Tester One",
    author: "First Tester",
    url: "testerone.com",
    likes: 1,
  },
  {
    title: "Tester Two",
    author: "Second Tester",
    url: "testertwo.com",
    likes: 2,
  },
  {
    title: "Tester Three",
    author: "Third Tester",
    url: "testerthree.com",
    likes: 3,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
