import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="content">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick} className="button">like</button>
    </div>
  </div>
)

export default SimpleBlog
