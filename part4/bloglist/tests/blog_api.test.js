const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('tests before exercise 4.23', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('count blogs in test env return as 6', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, 6)
  })

  test('validate if the return object having id in the property', async () => {
    const res = await api.get('/api/blogs')
    assert.ok(res.body[0].id)
  })

  // test('validate post method', async () => {
  //   const newBlog = {
  //     title: 'Title 7',
  //     author: 'Author 1',
  //     url: 'https://example.com/7',
  //     likes: 8,
  //   }
  //
  //   const res = await api.post('/api/blogs').send(newBlog)
  //
  //   assert.strictEqual(res.body.title, newBlog.title)
  //   assert.strictEqual(res.body.author, newBlog.author)
  //   assert.strictEqual(res.body.url, newBlog.url)
  //   assert.strictEqual(res.body.likes, newBlog.likes)
  //
  //   const res2 = await api.get('/api/blogs')
  //   assert.strictEqual(res2.body.length, 7)
  // })

  test('validate default value of likes', async () => {
    const newBlog = {
      title: 'Title 7',
      author: 'Author 1',
      url: 'https://example.com/7',
    }

    const res = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(res.body.likes, 0)

    const res2 = await api.get('/api/blogs')
    assert.strictEqual(res2.body.length, 7)
  })

  // test('validate post new blog that missing title or url', async () => {
  //   const blogMissTitle = {
  //     author: 'Author 1',
  //     url: 'https://example.com/7',
  //     likes: 8,
  //   }
  //
  //   const blogMissUrl = {
  //     title: 'Title 7',
  //     author: 'Author 1',
  //     likes: 8,
  //   }
  //
  //   const res = await api.post('/api/blogs').send(blogMissTitle)
  //   assert.strictEqual(res.status, 400)
  //   assert.strictEqual(res.body.error, 'Title or url missing')
  //
  //   const res2 = await api.get('/api/blogs')
  //   assert.strictEqual(res2.body.length, 6)
  //
  //   const res3 = await api.post('/api/blogs').send(blogMissUrl)
  //   assert.strictEqual(res3.status, 400)
  //   assert.strictEqual(res3.body.error, 'Title or url missing')
  //
  //   const res4 = await api.get('/api/blogs')
  //   assert.strictEqual(res4.body.length, 6)
  // })
})

describe('when deleteting a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const allBlogs = await Blog.find({})
    const blogToDelete = allBlogs[0]

    const res = await api.delete(`/api/blogs/${blogToDelete.id}`)
    assert.strictEqual(res.status, 204)

    const res2 = await api.get('/api/blogs')
    assert.strictEqual(res2.body.length, 5)
  })
})

describe('when updating a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('succeeds with status code 200 and updated object if id is valid', async () => {
    const allBlogs = await Blog.find({})
    const blogToUpdate = allBlogs[0]

    const newBlog = {
      ...blogToUpdate,
      likes: 12,
    }

    const res = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.body.likes, newBlog.likes)

    const res2 = await api.get('/api/blogs')
    assert.strictEqual(res2.body.length, 6)
  })
})

describe('when post a new blog from exercise 4.17', () => {
  beforeEach(async () => {
    const initialUser = [
      {
        username: 'admin',
        name: 'Admin',
        password: 'admin',
      },
    ]

    await User.deleteMany({})
    await User.insertMany(initialUser)
  })

  test('add new blog that automatically assign to a user', async () => {
    const newBlog = {
      title: 'Title 7',
      author: 'Author 1',
      url: 'https://example.com/7',
      likes: 8,
    }

    const expectResult = {
      title: 'Title 7',
      author: 'Author 1',
      url: 'https://example.com/7',
      likes: 8,
      user: {
        username: 'admin',
        name: 'Admin',
      },
    }

    const res = await api.post('/api/blogs').send(newBlog)
    const res2 = await api.get(`/api/blogs/${res.body.id}`)
    assert.strictEqual(res2.body.title, expectResult.title)
    assert.strictEqual(res2.body.author, expectResult.author)
    assert.strictEqual(res2.body.url, expectResult.url)
    assert.strictEqual(res2.body.likes, expectResult.likes)
    assert.strictEqual(res2.body.user.username, expectResult.user.username)
    assert.strictEqual(res2.body.user.name, expectResult.user.name)
  })
})

describe('when post a new blog from exercise 4.23', () => {
  let token = ''

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const user = {
      username: 'admin',
      name: 'Admin',
      password: 'adminPassword',
    }

    await api.post('/api/users').send(user)

    const res = await api.post('/api/login').send(user)
    token = res.body.token
  })

  test('failed post new blog that missing token', async () => {
    const newBlog = {
      title: 'Title 7',
      author: 'Author 1',
      url: 'https://example.com/7',
      likes: 8,
    }

    const res = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(res.status, 401)
  })

  test('validate post method', async () => {
    const newBlog = {
      title: 'Title 7',
      author: 'Author 1',
      url: 'https://example.com/7',
      likes: 8,
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)

    assert.strictEqual(res._body.title, newBlog.title)
    assert.strictEqual(res._body.author, newBlog.author)
    assert.strictEqual(res._body.url, newBlog.url)
    assert.strictEqual(res._body.likes, newBlog.likes)

    const res2 = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    assert.strictEqual(res2._body.length, 1)
  })

  test('validate post new blog that missing title or url', async () => {
    const blogMissTitle = {
      author: 'Author 1',
      url: 'https://example.com/7',
      likes: 8,
    }

    const blogMissUrl = {
      title: 'Title 7',
      author: 'Author 1',
      likes: 8,
    }

    const res = await api
      .post('/api/blogs')
      .send(blogMissTitle)
      .set('Authorization', `bearer ${token}`)
    assert.strictEqual(res.status, 400)
    assert.strictEqual(res.body.error, 'Title or url missing')

    const res2 = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    assert.strictEqual(res2.body.length, 0)

    const res3 = await api
      .post('/api/blogs')
      .send(blogMissUrl)
      .set('Authorization', `bearer ${token}`)
    assert.strictEqual(res3.status, 400)
    assert.strictEqual(res3.body.error, 'Title or url missing')

    const res4 = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
    assert.strictEqual(res4.body.length, 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})
