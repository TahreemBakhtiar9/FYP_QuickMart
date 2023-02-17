const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    email: String,
    password: String,
    phone: Number,
    Role: String
})

module.exports = mongoose.model('User', userSchema);