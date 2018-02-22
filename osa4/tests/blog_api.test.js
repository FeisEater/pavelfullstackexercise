const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, formatBlog, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET', async () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
      
    test('all blogs are returned', async () => {
      const blogsInDatabase = await blogsInDb()
      const response = await api
        .get('/api/blogs')
    
      expect(response.body.length).toBe(blogsInDatabase.length)
    })
      
    test('a specific blog is within the returned blogs', async () => {
      const response = await api
        .get('/api/blogs')
    
      const blogs = response.body.map(formatBlog)
    
      expect(blogs).toContainEqual({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      })
    })
})

describe('POST', async () => {
    test('a valid blog can be added ', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            title: "Blog title",
            author: "Me",
            url: "cool.com",
            likes: 2
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api
          .get('/api/blogs')
      
        const blogs = response.body.map(formatBlog)
          
        expect(response.body.length).toBe(blogsInDatabase.length + 1)
        expect(blogs).toContainEqual(newBlog)
    })
      
    test('blog without likes defaults to zero', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            title: "Blog title",
            author: "Me",
            url: "cool.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const response = await api
          .get('/api/blogs')
      
        const blogs = response.body.map(formatBlog)
          
        expect(response.body.length).toBe(blogsInDatabase.length + 1)
        expect(blogs).toContainEqual({
            title: "Blog title",
            author: "Me",
            url: "cool.com",
            likes: 0
        })
    })
    
    test('blog without title cant be saved', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            author: "Me",
            url: "cool.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api
          .get('/api/blogs')
      
        expect(response.body.length).toBe(blogsInDatabase.length)
    })
    
    test('blog without url cant be saved', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            title: "Blog title",
            author: "Me"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const response = await api
          .get('/api/blogs')
      
        expect(response.body.length).toBe(blogsInDatabase.length)
    })
})

afterAll(() => {
  server.close()
})
