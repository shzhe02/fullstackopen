const lodash = require("lodash")

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map((e) => e.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length <= 0) {
    return {}
  }
  const best = blogs.reduce(
    (best, curr) => (curr.likes > best.likes ? curr : best),
    blogs[0]
  )
  const output = {
    title: best.title,
    author: best.author,
    likes: best.likes,
  }
  return output
}

const mostBlogs = (blogs) => {
  if (blogs.length <= 0) {
    return {}
  }
  const counts = lodash.countBy(blogs, (e) => e.author)
  const bestAuthor = lodash.max(Object.keys(counts), (e) => counts[e])
  const output = {
    author: bestAuthor,
    blogs: counts[bestAuthor],
  }
  return output
}

const mostLikes = (blogs) => {
  if (blogs.length <= 0) {
    return {}
  }
  const authors = lodash.groupBy(blogs, (e) => e.author)
  const authorLikes = []
  Object.keys(authors).forEach((author) => {
    const authorEntry = {
      author: author,
      likes: lodash.sum(authors[author].map((e) => e.likes)),
    }
    authorLikes.push(authorEntry)
  })
  return lodash.maxBy(authorLikes, (e) => e.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
