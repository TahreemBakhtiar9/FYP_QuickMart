const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {type: String,
    required: true,
    index: {unique: true,
}},
    email: {type: String,
        required: true,
        index: {unique: true,
    }},
    password: {type: String,
        required: true,
        },
    phone: {type: Number,
        required: true,
        index: {unique: true,
    }},
    Role: {type: String,
        required: true,
        },
})

module.exports = mongoose.model('User', userSchema);