import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const body = {
    user: blog.user == null ? null : blog.user._id,
    likes: blog.likes + 1,
    author: blog.author,
    url: blog.url,
    title: blog.title
  }
  const response = await axios.put(`${baseUrl}/${blog._id}`, body)
  return response.data
}

const removeBlog = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}

export default { getAll, createBlog, setToken, likeBlog, removeBlog}