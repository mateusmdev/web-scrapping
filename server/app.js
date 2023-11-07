const express = require('express')
const app = express()
const cors = require('cors')

const scraperRouter = require('./src/routes/scraper')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', scraperRouter)

module.exports = app