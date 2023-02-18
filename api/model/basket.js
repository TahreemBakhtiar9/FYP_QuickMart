const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    basketName: String,
    code: String,

})

module.exports = mongoose.model('Basket', basketSchema);