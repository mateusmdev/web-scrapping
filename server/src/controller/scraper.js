const contextScrap = require('./../scraper/context')
const amazon = require('./../scraper/amazon')

/*
A classe Scraper é responsável por receber uma palavra-chave da solicitação HTTP, definir a estratégia 
de raspagem como amazon, realizar a raspagem de dados usando a estratégia e responder com os dados raspados 
ou mensagens de erro apropriadas com base no resultado da raspagem.
*/

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