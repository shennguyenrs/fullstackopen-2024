const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((error) => next(error))
})

blogRouter.post('/', (req, res, next) => {
  let body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({
      error: 'Title or url missing',
    })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog(body)

  blog
    .save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => next(error))
})

module.exports = blogRouter
