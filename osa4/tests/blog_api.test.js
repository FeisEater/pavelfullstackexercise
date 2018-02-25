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
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsInDatabase.length + 1)
        expect(blogsAfter).toContainEqual(newBlog)
    })
      
    test('blog without likes defaults to zero', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            title: "Blog title2",
            author: "Me2",
            url: "cool2.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsInDatabase.length + 1)
        expect(blogsAfter).toContainEqual({
            title: "Blog title2",
            author: "Me2",
            url: "cool2.com",
            likes: 0
        })
    })
    
    test('blog without title cant be saved', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            author: "Me3",
            url: "cool3.com"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsInDatabase.length)
    })
    
    test('blog without url cant be saved', async () => {
        const blogsInDatabase = await blogsInDb()
        const newBlog = {
            title: "Blog title4",
            author: "Me4"
        }
      
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
      
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsInDatabase.length)
    })
})

describe('DELETE', async () => {
    let testBlog
    beforeEach(async () => {
        testBlog = new Blog({
            title: "Blog title5",
            author: "Me5",
            url: "cool5.com",
            likes: 2
        })
        await testBlog.save()
    })

    test('blog can be deleted', async () => {
        const blogsInDatabase = await blogsInDb()
        await api
          .delete(`/api/blogs/${testBlog._id}`)
          .expect(204)
        const blogsAfter = await blogsInDb()
        expect(blogsAfter).not.toContainEqual(testBlog)
        expect(blogsAfter.length).toBe(blogsInDatabase.length - 1)
    })

    test('with invalid id nothing is deleted', async () => {
        const blogsInDatabase = await blogsInDb()
        await api
          .delete('/api/blogs/badurl')
          .expect(400)
        const blogsAfter = await blogsInDb()
        expect(blogsAfter).toContainEqual(formatBlog(testBlog))
        expect(blogsAfter.length).toBe(blogsInDatabase.length)
    })
})

afterAll(() => {
  server.close()
})
