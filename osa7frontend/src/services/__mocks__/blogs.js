let token = null

const blogs = [
    {
        "_id":"5a92dda7220f9d51d81c8110",
        "title":"authorised title",
        "author":"me",
        "url":"cool.com",
        "likes":20,
        "user": {
            "_id":"5a92d78ea3b88a5224d4d22f",
            "username":"pasmpasm",
            "name":"Pavel Smirnov"
        },
        "__v":0
    },
    {
        "_id":"5a96e34de0500935683c39d9",
        "title":"otsikko",
        "author":"tekijä",
        "url":"url",
        "likes":0,
        "user": {
            "_id":"5a92d78ea3b88a5224d4d22f",
            "username":"pasmpasm",
            "name":"Pavel Smirnov"
        },
        "__v":0
    }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = t => token = t

export default { getAll, blogs, setToken }
