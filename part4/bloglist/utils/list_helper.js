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

const mostBlogs = (blogs) => {
  let dict = {}

  for (let i = 0; i < blogs.length; i++) {
    if (dict[blogs[i].author]) {
      dict[blogs[i].author] += 1
    } else {
      dict[blogs[i].author] = 1
    }
  }

  let max = 0
  let idx = ''

  for (let i in dict) {
    if (dict[i] > max) {
      max = dict[i]
      idx = i
    }
  }

  return { author: idx, blogs: max }
}

const mostLikes = (blogs) => {
  let dict = {}

  for (let i = 0; i < blogs.length; i++) {
    if (dict[blogs[i].author]) {
      dict[blogs[i].author] += blogs[i].likes
    } else {
      dict[blogs[i].author] = blogs[i].likes
    }
  }

  let max = 0
  let idx = ''

  for (let i in dict) {
    if (dict[i] > max) {
      max = dict[i]
      idx = i
    }
  }

  return { author: idx, likes: max }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
