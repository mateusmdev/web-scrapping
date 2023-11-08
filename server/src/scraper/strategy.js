/*
Essa classe Strategy é destinada a ser usada como uma 'interface' da POO em JavaScript. 
Ela define um contrato para subclasses, exigindo que elas implementem o método scrap(path). 
Caso a implementação pela subclasse são seja feita, 'Not Implemented Error' seŕa lançada.
*/
class Strategy{
    async scrap(path){
        throw new Error('Not Implemented Error')
    }
}

module.exports = Strategy