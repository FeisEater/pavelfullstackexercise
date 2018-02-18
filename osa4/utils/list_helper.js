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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
