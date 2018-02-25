const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    blogs.user = 
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const user = await User.findById(request.body.userId)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user === null ? null : user._id
    })
    if (blog.title === undefined)
        return response.status(400).json({ error: 'title missing' })
    if (blog.url === undefined)
        return response.status(400).json({ error: 'url missing' })
    if (blog.likes === undefined)
        blog.likes = 0
    const savedBlog = await blog.save()
    if (user !== null) {
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }
    response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const blog = {}
    if (request.body.title !== undefined)
        blog.title = request.body.title
    if (request.body.author !== undefined)
        blog.author = request.body.author
    if (request.body.url !== undefined)
        blog.url = request.body.url
    if (request.body.likes !== undefined)
        blog.likes = request.body.likes
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
        response.json(updatedBlog)
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})
  
module.exports = blogRouter