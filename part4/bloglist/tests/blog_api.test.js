const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'https://example.com/1',
    likes: 8,
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'https://example.com/2',
    likes: 2,
  },
  {
    title: 'Title 3',
    author: 'Author 2',
    url: 'https://example.com/3',
    likes: 7,
  },
  {
    title: 'Title 4',
    author: 'Author 2',
    url: 'https://example.com/4',
    likes: 6,
  },
  {
    title: 'Title 5',
    author: 'Author 1',
    url: 'https://example.com/5',
    likes: 10,
  },
  {
    title: 'Title 6',
    author: 'Author 1',
    url: 'https://example.com/6',
    likes: 7,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObjects = initialBlogs.map((blog) => new Blog(blog))
  let promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('count blogs in test env return as 6', async () => {
  const res = await api.get('/api/blogs')
  assert.strictEqual(res.body.length, 6)
})

test('validate if the return object having id in the property', async () => {
  const res = await api.get('/api/blogs')
  assert.ok(res.body[0].id)
})

after(async () => {
  await mongoose.connection.close()
})
