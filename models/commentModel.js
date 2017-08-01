let mongoose = require('mongoose');

let commentModel = mongoose.Schema({
    name: { type: String, required: true},
    date: { type: Date, required: true, default: Date.now },
    subject: { type: String },
    message: { type: String, default: true },
    blogId: { type: mongoose.Schema.ObjectId }
});

module.exports = mongoose.model('Comment', commentModel);
