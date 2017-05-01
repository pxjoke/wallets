const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Wallet'}]
});

module.exports = mongoose.model('User', userSchema);