import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  loggedIn: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store