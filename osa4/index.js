const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogcontroller')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

const mongoUrl = 'salaisuus'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
