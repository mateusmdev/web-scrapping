const Strategy = require('./strategy')
const axios = require('axios').default
const cheerio = require('cheerio')
const URL = process.env.AMAZON_URL

class Amazon extends Strategy{
    constructor(){
        super()
    }

    async scrap(keyword){
        try {
            const path = URL + `${keyword}`
            const response = await axios.get(path, {
                headers: {
                  Accept: "application/json",
                  "User-Agent": "axios 0.21.1",
                  "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
                }
              })
            const $ = cheerio.load(response.data)
            const products = []

            $('div.s-result-item.AdHolder.s-asin').each((index, element) => {
                const amazonProduct = {}
                amazonProduct.title = $(element).find('h2 a span').text().trim()
                amazonProduct.rating = $(element).find('.a-icon-star-small .a-icon-alt').text()
                amazonProduct.numReviews = $(element).find('div div.a-row.a-size-small span a.s-link-style span').text()
                amazonProduct.imageUrl = $(element).find('div div a img.s-image').attr('src')
                console.log(amazonProduct)

                products.push(amazonProduct)
            })
            
            return products
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Amazon()