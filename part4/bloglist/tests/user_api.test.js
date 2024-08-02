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

after(async () => {
  await mongoose.connection.close()
})
