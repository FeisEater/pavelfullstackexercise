import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const DeleteButton = ({deleteFunc, show}) => {
  if (!show)
    return null
  return (
    <div>
      <button onClick={deleteFunc}>Delete</button>
    </div>
  )
}

DeleteButton.propTypes = {
  deleteFunc: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  static propTypes = {
    blog: PropTypes.any.isRequired
  }

  toggleExpansion = () => {
    this.setState({expanded: !this.state.expanded})
  }

  deleteBlog = async (blog) => {
    if (!window.confirm("Poistetaanko " + blog.title + "?"))
      return
    await this.props.deleteBlog(this.props.blog)
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blog = this.props.blog

    if (!this.state.expanded) {
        return (
          <div style={blogStyle} onClick={this.toggleExpansion} className="blogHeader">
            {blog.title} {blog.author}
          </div>
        )
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleExpansion} className="blogHeader">{blog.title} {blog.author}</div>
        <div className="details">
          <a href={'//' + blog.url} className="urlLink">{blog.url}</a>
          <div className="likes">{blog.likes} likes <button onClick={() => this.props.likeBlog(blog)}>Like</button></div>
          <div className="creator">Added by {blog.user == null ? '--' : blog.user.name}</div>
          <DeleteButton deleteFunc={() => this.deleteBlog(blog)} show={blog.user === null || blog.user.username === this.props.loggedIn.username} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const ConnectedBlog = connect(
  mapStateToProps,
  { likeBlog, deleteBlog }
)(Blog)

export default ConnectedBlog