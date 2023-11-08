const Strategy = require('./strategy')
const axios = require('axios').default
const cheerio = require('cheerio')
const URL = process.env.AMAZON_URL

/*
A classe Amazon representa uma estratégia específica para raspar informações de produtos na Amazon usando o 
módulo 'axio's para solicitações HTTP e o 'cheerio' para análise de HTML. A estratégia é usada em conjunto 
com a classe 'Context', onde diferentes estratégias podem ser injetadas e usadas dinamicamente. Ela é uma
classe concreta/subclasse de 'Strategy'.
*/

class Amazon extends Strategy {
    constructor() {
        super()
    }

    async scrap(keyword) {
        /*
        Este método é responsável por raspar informações de produtos da Amazon com base em uma palavra-chave 
        fornecida. Ele faz uma solicitação HTTP para a URL da Amazon, analisa o HTML da página da Amazon e 
        extrai detalhes dos produtos encontrados. Esses detalhes são retornados como um array de objetos 
        contendo informações sobre os produtos.
        */


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

                products.push(amazonProduct)
            })

            return products
        } catch (error) {
            throw error
        }
    }
}

module.exports = new Amazon()