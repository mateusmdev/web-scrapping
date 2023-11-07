const express = require('express')
const router = express.Router()

const controller = require('../controller/scraper.js')

router.get('/api/scrape', controller.scrap)

module.exports = router