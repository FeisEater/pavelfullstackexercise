import blogService from '../services/blogs'
import loginService from '../services/login'
import { localError, localInfo } from './notificationReducer'


export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: credentials.username,
        password: credentials.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', user })
    } catch (exception) {
      localError('käyttäjänimi tai salasana väärin', 5000, dispatch)
    }
  }
}

export const loginLocalStorage = () => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(window.localStorage.getItem('loggedUser'))
      if (user)
        blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', user })
    } catch (exception) {}
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')   
    blogService.setToken(null)
    dispatch({ type: 'LOGOUT' })
    localInfo('kirjauduttu ulos', 5000, dispatch)
  }
}

const reducer = (store = null, action) => {
  if (action.type === 'LOGIN') {
    return action.user
  }
  if (action.type === 'LOGOUT') {
    return null
  }
  return store
}

export default reducer