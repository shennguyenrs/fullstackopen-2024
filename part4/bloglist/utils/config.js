const PORT = process.env.PORT || 3001
const MONGODB_URI =
  process.env.NODE_ENV === 'prod'
    ? process.env.PROD_MONGODB_URI
    : process.env.NODE_ENV === 'dev'
      ? process.env.DEV_MONGODB_URI
      : process.env.TEST_MONGODB_URI

module.exports = { PORT, MONGODB_URI }
