const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  return blogs.reduce((sum, i) => {
    return sum + i.likes
  }, sum)
}

module.exports = {
  dummy,
  totalLikes,
}
