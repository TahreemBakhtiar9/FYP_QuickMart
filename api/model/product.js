const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productName: String,
    code: String,
    quantity: Number,
    price: Number,
    //image:

})

module.exports = mongoose.model('Product', productSchema);