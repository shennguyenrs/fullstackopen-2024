const morgan = require('morgan')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
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

  next(error)
}

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler,
}
