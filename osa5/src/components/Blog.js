import React from 'react'
import PropTypes from 'prop-types'

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
    blog: PropTypes.any.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    ownsEntry: PropTypes.bool.isRequired
  }

  toggleExpansion = () => {
    this.setState({expanded: !this.state.expanded})
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
          <div className="likes">{blog.likes} likes <button onClick={() => this.props.handleLike(blog)}>Like</button></div>
          <div className="creator">Added by {blog.user == null ? '--' : blog.user.name}</div>
          <DeleteButton deleteFunc={() => this.props.handleDelete(blog)} show={this.props.ownsEntry} />
        </div>
      </div>
    )
  }
}

export default Blog