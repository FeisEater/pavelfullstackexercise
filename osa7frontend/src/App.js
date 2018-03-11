import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import { blogInitialization } from './reducers/blogReducer'
import { loginLocalStorage, login, logout } from './reducers/loginReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount = async () => {
    await this.props.loginLocalStorage()
    await this.props.blogInitialization()
  } 

  login = async (event) => {
    event.preventDefault()
    await this.props.login({
      username: this.state.username,
      password: this.state.password
    })
    if (this.props.loggedIn)
      this.setState({ username: '', password: '' })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.props.loggedIn === null) {
      return (
        <div>
          <Notification />
          <h2>Kirjaudu</h2>
  
          <form onSubmit={this.login} className="loginForm">
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }
    
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <div className="userDiv">{this.props.loggedIn.name} logged in <button onClick={this.props.logout}>Log out</button></div>
        <br/>
        <Togglable buttonLabel="uusi blogi" ref={component => this.blogForm = component}>
          <BlogForm blogForm={this.blogForm} />
        </Togglable>
        <br/>
        {this.props.blogs.map(blog => 
          <Blog key={blog._id}
                blog={blog} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    loggedIn: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, loginLocalStorage, login, logout }
)(App)