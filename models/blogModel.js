let mongoose = require('mongoose');

let blogModel = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    lastUpdated: { type: Date, required: true, default: Date.now },
    published: Boolean,
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Blog', blogModel);