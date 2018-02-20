const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogcontroller')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

mongoose
.connect(config.mongoUrl)
.then(() => {
    console.log('connected to database', config.mongoUrl)
})
.catch(err => {
    console.log(err)
})
mongoose.Promise = global.Promise

const server = http.createServer(app)

const PORT = config.port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
    app, server
}