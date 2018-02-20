const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined)
        blog.likes = 0
    await blog.save()
    response.status(201).json(blog)
})

module.exports = blogRouter