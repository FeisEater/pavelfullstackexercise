import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                otsikko
                <input
                    type="text"
                    name="newtitle"
                    value={title}
                    onChange={handleChange}
                />
                </div>
                <div>
                tekijä
                <input
                    type="text"
                    name="newauthor"
                    value={author}
                    onChange={handleChange}
                />
                </div>
                <div>
                url
                <input
                    type="text"
                    name="newurl"
                    value={url}
                    onChange={handleChange}
                />
                </div>
                <button type="submit">luo uusi</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BlogForm