import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newtitle: '',
      newauthor: '',
      newurl: '',
      message: null,
      messageIsError: false
    }
    this.msgTimeout = setTimeout(() => {}, 0)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }  
  } 

  showMessage = (msg, isError) => {
    this.setState({
      message: msg,
      messageIsError: isError
    })
    clearTimeout(this.msgTimeout)
    this.msgTimeout = setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)
    } catch(exception) {
      this.showMessage('käyttäjätunnus tai salasana virheellinen', true)
    }
  }

  logout = event => {
    window.localStorage.removeItem('loggedUser')   
    this.setState({user: null})
    blogService.setToken(null)
    this.showMessage('kirjauduttu ulos', false)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  createBlog = async (event) => {
    event.preventDefault()    
    try {
      const savedBlog = await blogService.createBlog({
        title: this.state.newtitle,
        author: this.state.newauthor,
        url: this.state.newurl,
        likes: 0
      })
      this.setState({
        newtitle: '',
        newauthor: '',
        newurl: '',
        blogs: this.state.blogs.concat(savedBlog)
      })
      this.showMessage('Blogi luotu', false)
      this.blogForm.toggleVisibility()
    } catch (exception) {
      console.log(exception)
      this.showMessage('Jokin meni päin persettä, lue logi', true)      
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.message} isError={this.state.messageIsError}/>
          <h2>Kirjaudu</h2>
  
          <form onSubmit={this.login}>
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
        <Notification message={this.state.message} isError={this.state.messageIsError}/>
        <h2>blogs</h2>
        <div>{this.state.user.name} logged in <button onClick={this.logout}>Log out</button></div>
        <br/>
        <Togglable buttonLabel="uusi blogi" ref={component => this.blogForm = component}>
          <BlogForm
            title={this.state.newtitle}
            author={this.state.newauthor}
            url={this.state.newurl}
            handleChange={this.handleBlogFieldChange}
            handleSubmit={this.createBlog}
          />
        </Togglable>
        <br/>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
