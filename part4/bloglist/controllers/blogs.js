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

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    })
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
