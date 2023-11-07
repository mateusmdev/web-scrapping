class View{
    constructor(){
        this.el = {}
        this._loadElements()
        this.init()
    }

    init() {
        this.bindFormSubmit()
        //this.bindClickMessageItems()
        //this.bindClickNavigationBtn()
    }

    _loadElements() {
        const ids = document.querySelectorAll('[id]')
        ids.forEach(element => {
            const div = document.createElement('div')
            div.innerHTML = `<div data-${element.id}="id"></div>`
            const idCamelCase = Object.keys(div.firstChild.dataset)[0]
            this.el[idCamelCase] = element
        })
    }

    async bindFormSubmit(){
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
        let html = ''
        items.forEach(item => {
            const template = `
            <li>
                <div>
                    <img src="${item.imageUrl}" />
                </div>
            </li>`

            html += template
        })
        const { productList } = this.el
        productList.innerHTML = html
    }

    async request(keyword){
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