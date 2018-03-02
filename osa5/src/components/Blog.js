import React from 'react'

const DeleteButton = ({deleteFunc, show}) => {
  if (!show)
    return null
  return (
    <div>
      <button onClick={deleteFunc}>Delete</button>
    </div>
  )
}

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
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
          <div style={blogStyle} onClick={this.toggleExpansion}>
            {blog.title} {blog.author}
          </div>
        )
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleExpansion}>{blog.title} {blog.author}</div>
        <div>
          <a href={'//' + blog.url}>{blog.url}</a>
          <div>{blog.likes} likes <button onClick={() => this.props.handleLike(blog)}>Like</button></div>
          <div>Added by {blog.user == null ? '--' : blog.user.name}</div>
          <DeleteButton deleteFunc={() => this.props.handleDelete(blog)} show={this.props.ownsEntry} />
        </div>
      </div>
    )
  }
}

export default Blog