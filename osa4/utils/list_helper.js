const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return {}
    let sortedBlogs = blogs.slice()
    sortedBlogs.sort((a, b) => {
        return b.likes - a.likes
    })
    return {
        title: sortedBlogs[0].title,
        author: sortedBlogs[0].author,
        likes: sortedBlogs[0].likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return {}
    let blogCountByAuthor = {}
    let record = 0
    let recordAuthor = ""
    blogs.forEach(blog => {
        if (blog.author in blogCountByAuthor)
            blogCountByAuthor[blog.author] += 1
        else
            blogCountByAuthor[blog.author] = 1
        if (blogCountByAuthor[blog.author] > record) {
            record = blogCountByAuthor[blog.author]
            recordAuthor = blog.author
        }
    })
    return {
        author: recordAuthor,
        blogs: record
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
