/*
Permite que diferentes estratégias sejam injetadas e aplicadas em um contexto específico. 
Útil quando é alternar dinamicamente entre diferentes tipos de estratégias/algoritmos de
uma implementação sem modificar o código do contexto ou os trechos que utilizam essa classe. 
O método 'scrapData' delega a execução da operação à estratégia definida, permitindo que o 
contexto se comporte de maneira flexível com base na estratégia escolhida, diminuindo acoplamento.
*/

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