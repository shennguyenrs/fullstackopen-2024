const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    })
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.username || !body.password) {
    return res.status(400).json({
      error: 'Username or password missing',
    })
  }

  if (body.password.length < 3) {
    return res.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    return res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter
