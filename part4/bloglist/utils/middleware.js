const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token',
    })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired',
    })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'Missing token' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  req.user = user
  next()
}

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
