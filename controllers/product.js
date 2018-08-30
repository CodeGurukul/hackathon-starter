const {products} = require('../config/data')

exports.getAllProducts = (request, response) => {
    response.render('products/list', {
        title: 'All Products',
        products
    })
}

exports.getNewProduct = (request, response) => {
    response.render('products/new', {
        title: 'Create New Products'
    })
}

exports.getProductById = (request, response) => {
    if(request.params.id<0 || request.params.id >= products.length)
    {
        response.render('404', {
            title: '404'
        })
    }
    else {
        var product = products[request.params.id]
        response.render('products/single', {
            title: 'Product Page',
            product: product
        })
    }
    
}

exports.getEditProductById = (request, response) => {
    if(request.params.id<0 || request.params.id >= products.length)
    {
        response.render('404', {
            title: '404'
        })
    }
    else {
        var product = products[request.params.id]
        response.render('products/edit', {
            title: 'Products Edit Page',
            product: product
        })
    }
}