class queryProducts {
    products = []
    query = {}
    constructor(products,query){
        this.products = products
        this.query = query
    }

    categoryQuery = () => {
        this.products = this.query.category ? this.products.filter(c => c.category === this.query.category) : this.products
        return this
    }

    ratingQuery = () => {
        this.products = this.query.rating ? this.products.filter(c => parseInt(this.query.rating) <= c.rating && c.rating < parseInt(this.query.rating) + 1) : this.products
        return this
    }

    searchQuery = () => {
        this.products = this.query.searchValue ? this.products.filter(p => p.name.toUpperCase().indexOf(this.query.searchValue.toUpperCase()) > -1  ) : this.products
        return this
    }

    priceQuery = () => {
        const low = this.query.lowPrice ? parseFloat(this.query.lowPrice) : 0;
        const high = this.query.highPrice ? parseFloat(this.query.highPrice) : Infinity;
        
        this.products = this.products.filter(p => p.price >= low && p.price <= high);
        return this;
    }
 
    sortByPrice = () => {
        if (this.query.sortPrice) {
            if (this.query.sortPrice === 'low-to-high') {
                this.products = this.products.sort(function (a,b){ return a.price - b.price})
            } else {
                this.products = this.products.sort(function (a,b){ return b.price - a.price})
            }
        }
        return this
    }

    skip = () => {
        let pageNumber = this.query.pageNumber ? parseInt(this.query.pageNumber) : 1;
        let parPage = this.query.parPage ? parseInt(this.query.parPage) : 12;
        const skipPage = (pageNumber - 1) * parPage;
        let skipProduct = [];

        for (let i = skipPage; i < this.products.length; i++) {
            skipProduct.push(this.products[i]) 
        }

        this.products = skipProduct;
        // console.log('⏩ Skip step. Skipped:', skipPage, 'Remaining after skip:', this.products.length);
        return this;
    }


    limit = () => {
        let parPage = this.query.parPage ? parseInt(this.query.parPage) : 12;
        let temp = [];

        if (this.products.length > parPage) {
            for (let i = 0; i < parPage; i++) {
                temp.push(this.products[i]) 
            } 
        } else {
            temp = this.products
        }

        this.products = temp;
        // console.log('🔒 Limit step. Products before limit:', this.products.length);
        return this;
    }

    getProducts = () => {
        return this.products
    }

    countProducts = () => {
        return this.products.length
    } 
}

module.exports = queryProducts