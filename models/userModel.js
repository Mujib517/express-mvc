let mongoose = require('mongoose');

let userModel = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userModel);