import blogService from '../services/blogs'
import { localError } from './notificationReducer'

export const createBlog = (blog, loggedIn) => {
  return async (dispatch) => {
    try {
      let data = await blogService.createBlog(blog)
      data.user = { name: loggedIn.name, username: loggedIn.username }
      dispatch({ type: 'CREATE', data })
    } catch (exception) {
      console.log(exception)
      localError('Jokin meni päin persettä, lue logi', 5000, dispatch)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.likeBlog(blog)
      dispatch({ type: 'LIKE', data })
    } catch (exception) {
      console.log(exception)
      localError('Jokin meni päin persettä, lue logi', 5000, dispatch)
    }  
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({ type: 'INIT_NOTES', data })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(blog)
      dispatch({ type: 'DELETE', removedId: blog._id })
    } catch (exception) {
      console.log(exception)
      localError('Jokin meni päin persettä, lue logi', 5000, dispatch)
    }
  }
}

const reducer = (store = [], action) => {
  if (action.type==='LIKE') {
    const old = store.filter(a => a._id !== action.data._id)
    return [...old, action.data ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'DELETE') {
      return store.filter(a => a._id !== action.removedId)
  }
  if (action.type === 'INIT_NOTES')
    return action.data

  return store
}

export default reducer