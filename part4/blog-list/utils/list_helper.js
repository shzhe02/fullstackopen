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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
