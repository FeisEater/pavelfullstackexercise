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
  const savedBlog = await axios.post(baseUrl, blog, config)
  return savedBlog.data
}

export default { getAll, createBlog, setToken}