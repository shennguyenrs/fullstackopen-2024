const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res, next) => {
  try {
    const result = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    return res.json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findById(req.params.id).populate('user', {
      username: 1,
      name: 1,
    })
    return res.json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (req, res, next) => {
  let body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({
      error: 'Title or url missing',
    })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    if (!body.likes) {
      body.likes = 0
    }

    let raw = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    }

    const blog = new Blog(raw)

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
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
