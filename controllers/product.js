const { products: productArray } = require('../config/data')
const Product = require('../models/Product')

exports.getAllProducts = (request, response) => {
    Product.find({}, (error, products) => {
        response.render('products/list', {
            title: 'All Products',
            products
        })
    })

}

exports.getNewProduct = (request, response) => {
    response.render('products/new', {
        title: 'Create New Products'
    })
}

exports.postNewProduct = (request, response) => {
    const { name, category, description, cost } = request.body
    var product = new Product({
        name,
        category,
        description,
        cost
    })
    product.save().then(() => {
        response.redirect('/products')
    });

}

exports.getProductById = (request, response) => {
    Product.findById(request.params.id, (error, product) => {
        if (error)
            response.render('500', {
                title: '500 server error',
                error: error
            })
        else {
            console.log(product)
            response.render('products/single', {
                title: 'Product Page',
                product: product
            })
        }

    })
}

exports.getEditProductById = (request, response) => {
    Product.findById(request.params.id, (error, product) => {
        if (error)
            response.render('500', {
                title: '500 server error',
                error: error
            })
        else {
            console.log(product)
            response.render('products/edit', {
                title: 'Edit Product',
                product: product
            })
        }

    })
}
exports.postDeleteProductById = (request, response) => {
    Product.deleteOne({_id: request.params.id}, (error) =>{
        if (error)
            response.render('500', {
                title: '500 server error',
                error: error
            })
        else {
            response.redirect('/products')
        }
    })
}
exports.postEditProductById = (request, response) => {
    const { name, category, description, cost } = request.body
    Product.findById(request.params.id, (error, product) => {
        if (error)
            response.render('500', {
                title: '500 server error',
                error: error
            })
        else {
            if (product) {
                product.name = name || product.name
                product.category = category || product.category
                product.cost = cost || product.cost
                product.description = description || product.description
                product.save().then(() =>{
                    response.render('products/edit', {
                        title: 'Edit Product',
                        product: product
                    })
                })
            }
            else {
                response.redirect('/products')
            }
        }

    })
}