const contextScrap = require('./../scraper/context')
const amazon = require('./../scraper/amazon')

class Scraper {
    async scrap(req, res) {
        const keyword = req.query.keyword
        if (!keyword){
            return res.status(400).json({
                message: 'You must provide a keyword to scrap data',
                status: 400
            })
        }

        try {
            contextScrap.strategy = amazon
            const data = await contextScrap.scrapData(keyword)
            return res.status(200).json({
                data,
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                message: 'An error ocurred while trying scrapping data',
                status: 500
            })
        }
    }
}

module.exports = new Scraper()