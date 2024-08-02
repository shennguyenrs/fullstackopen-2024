const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

const initialUser = [
  {
    username: 'admin',
    name: 'Admin',
    password: 'admin',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUser)
})

describe('when there is initially one user in database', () => {
  test('add new user successfully with 201 status', async () => {
    const newUser = {
      username: 'user',
      name: 'User',
      password: 'user',
    }

    const res = await api.post('/api/users').send(newUser)

    assert.strictEqual(res.status, 201)
    assert.strictEqual(res.body.username, newUser.username)
    assert.strictEqual(res.body.name, newUser.name)

    const res2 = await api.get('/api/users')
    assert.strictEqual(res2.body.length, 2)
  })
})

describe('when adding new user with invalid information', () => {
  test('cannot add user with username not unique', async () => {
    const newUser = {
      name: 'admin',
      username: 'admin',
      password: 'admin',
    }

    const res = await api.post('/api/users').send(newUser)
    assert.strictEqual(res.status, 500)

    const res2 = await api.get('/api/users')
    assert.strictEqual(res2.body.length, 1)
  })

  test('cannot add user with username length smaller than 3 characters ', async () => {
    const newUser = {
      username: 'us',
      name: 'admin',
      password: 'admin',
    }

    const res = await api.post('/api/users').send(newUser)
    assert.strictEqual(res.status, 400)
    assert.strictEqual(
      res.body.error,
      'User validation failed: username: Username must be at least 3 characters long',
    )

    const res2 = await api.get('/api/users')
    assert.strictEqual(res2.body.length, 1)
  })

  test('cannot add user with password length smaller than 3 characters', async () => {
    const newUser = {
      username: 'user',
      name: 'User',
      password: 'us',
    }

    const res = await api.post('/api/users').send(newUser)
    assert.strictEqual(res.status, 400)
    assert.strictEqual(
      res.body.error,
      'Password must be at least 3 characters long',
    )

    const res2 = await api.get('/api/users')
    assert.strictEqual(res2.body.length, 1)
  })
})

describe('when adding a new post', () => {
  test('fetch user that contains blog', async () => {
    const expectResult = {
      username: 'admin',
      name: 'Admin',
      blogs: [
        {
          title: 'Title 1',
          author: 'Author 1',
          url: 'https://example.com/1',
          likes: 5,
        },
      ],
    }

    const sampleBlog = {
      title: 'Title 1',
      author: 'Author 1',
      url: 'https://example.com/1',
      likes: 5,
    }

    await api.post('/api/blogs').send(sampleBlog)

    const res = await api.get('/api/users')

    assert.strictEqual(res.body.length, 1)
    assert.strictEqual(res.body[0].username, expectResult.username)
    assert.strictEqual(res.body[0].name, expectResult.name)
    assert.strictEqual(res.body[0].blogs.length, 1)
    assert.strictEqual(res.body[0].blogs[0].title, expectResult.blogs[0].title)
    assert.strictEqual(
      res.body[0].blogs[0].author,
      expectResult.blogs[0].author,
    )
    assert.strictEqual(res.body[0].blogs[0].url, expectResult.blogs[0].url)
  })
})

after(async () => {
  await mongoose.connection.close()
})
