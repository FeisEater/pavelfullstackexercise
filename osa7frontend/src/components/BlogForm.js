import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { info } from '../reducers/notificationReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newtitle: '',
      newauthor: '',
      newurl: ''
    }
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  createBlog = async (event) => {
    event.preventDefault()    
    await this.props.createBlog({
      title: this.state.newtitle,
      author: this.state.newauthor,
      url: this.state.newurl,
      likes: 0
    }, this.props.loggedIn)
    this.setState({
      newtitle: '',
      newauthor: '',
      newurl: ''
    })
    await this.props.info('Blogi luotu', 5000)
    this.props.blogForm.toggleVisibility()
  }

    render () {
        return (
            <div>
                <h2>Create new</h2>
                <form onSubmit={this.createBlog}>
                    <div>
                    otsikko
                    <input
                        type="text"
                        name="newtitle"
                        value={this.state.newtitle}
                        onChange={this.handleBlogFieldChange}
                    />
                    </div>
                    <div>
                    tekijä
                    <input
                        type="text"
                        name="newauthor"
                        value={this.state.newauthor}
                        onChange={this.handleBlogFieldChange}
                    />
                    </div>
                    <div>
                    url
                    <input
                        type="text"
                        name="newurl"
                        value={this.state.newurl}
                        onChange={this.handleBlogFieldChange}
                    />
                    </div>
                    <button type="submit">luo uusi</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const ConnectedBlogForm = connect(
  mapStateToProps,
  { createBlog, info }
)(BlogForm)

export default ConnectedBlogForm