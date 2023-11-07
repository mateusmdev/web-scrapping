class Context{
    constructor(){
        this._strategy
    }

    async scrapData(keyword){
        return await this._strategy.scrap(keyword)
    }

    set strategy(concrete){
        if (!concrete) throw new Error('NullPointer Exception')
        this._strategy = concrete
    }
}

module.exports = new Context()