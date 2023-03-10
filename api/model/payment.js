const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    email: String,
    phone: String,
    totalAmount:Number,
    totalCount: Number,
})

module.exports = mongoose.model('Payment', paymentSchema);