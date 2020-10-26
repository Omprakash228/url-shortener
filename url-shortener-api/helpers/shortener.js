const Urls = require('../models/urlEntity');

const getValidId = function() {
    let randomId = getRandomId();
    while(Urls.where({ _shortUrl: randomId }).length > 0) {
        randomId = getRandomId();
    }
    return randomId;
}

const getRandomId = function() {
    const allowedChars = "_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomstring = "";
    for(let i = 0; i < 13; i++) {
        randomstring += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    return randomstring;
}

module.exports = getValidId;