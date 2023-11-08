class View{
    constructor(){
        this.el = {}
        this._loadElements()
        this.init()
    }

    init() {
        this.bindFormSubmit()
    }

    _loadElements() {
        /*
        Encontra todos os elementos HTML na página que possuem um 'id', cria um objeto javascript para cada 
        um deles e armazena esses elementos em uma propriedade chamada 'el' criada no contrutor da classe
        */
        
        const ids = document.querySelectorAll('[id]')
        ids.forEach(element => {
            const div = document.createElement('div')
            div.innerHTML = `<div data-${element.id}="id"></div>`
            const idCamelCase = Object.keys(div.firstChild.dataset)[0]
            this.el[idCamelCase] = element
        })
    }

    async bindFormSubmit(){
        /*
        Lida com a submissão de um formulário através do 'addEventListener', realiza uma solicitação ao 
        servidor com um termo de pesquisa, processa a resposta e atualiza a página com os resultados ou 
        mostra uma mensagem de erro, dependendo do resultado da solicitação.
        */
        
        const { submitButton } = this.el
        submitButton.addEventListener('click', async event => {
            event.preventDefault()

            try {
                let data = []
                let keyword = this.el.productName.value.trim()
                const { result } = this.el
                keyword = keyword.replace(/\s+/g, '+')

                const response = await this.request(keyword)
                data = (await response.json()).data
                this.updateItems(data)
                result.innerHTML = `Resultado: ${data.length} items`
            } catch (error) {
                const { result, productList } = this.el
                result.innerHTML = 'Ocorreu um erro ao tentar extrair os dados.'
                productList.innerHTML = ''
            }
        })
    }

    updateItems(items){
        /*
        Constrói uma lista de itens formatados em HTML com base nos dados fornecidos no array 'items' e 
        insere essa lista na página dentro do elemento referenciado por 'productList'. Isso permite exibir 
        os itens na página em resposta à pesquisa realizada pelo usuário.
        */

        let html = ''
        items.forEach(item => {
            const rating = item.rating.replace(' out of 5 stars', '')

            const template = `
            <li>
                <div class="card">
                    <div class="img-wrapper">
                        <img src="${item.imageUrl}" />
                    </div>
                    <div class="content">
                        <h2>${item.title}</h2>
                        <p>Nota: ${rating}</p>
                        <p>Avaliações: ${item.numReviews}</p>
                    </div>

                </div>
            </li>`

            html += template
        })
        const { productList } = this.el
        productList.innerHTML = html
    }

    async request(keyword){
        /*
        Cria uma solicitação HTTP GET para uma URL específica, incluindo um termo de pesquisa 
        como parâmetro de consulta. Ele espera a resposta da solicitação e a retorna como uma
         promessa. O código que chama esse método pode, então, processar a resposta.
        */
        const url = `http://localhost:3000/api/scrape?keyword=${keyword}`
        const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

        return response
    }
}

new View()