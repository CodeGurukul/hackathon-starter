const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    //name: { type: String},
    category: String,
    description:String,
    cost: Number,
    createdOn: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Product', productSchema)