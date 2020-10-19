const mongoose = require('mongoose');

const urlDbSchema = mongoose.Schema({
    _shortUrl: {
        type: String,
        require: true
    },
    fullUrl: {
        type: String,
        require: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const urls = mongoose.model("urls", urlDbSchema);

module.exports = urls;