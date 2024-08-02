const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  return blogs.reduce((sum, i) => {
    return sum + i.likes
  }, sum)
}

const favoriteBlog = (blogs) => {
  let max = 0
  let idx = 0

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > max) {
      max = blogs[i].likes
      idx = i
    }
  }

  return {
    title: blogs[idx].title,
    author: blogs[idx].author,
    likes: blogs[idx].likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
