const db = require('../db');

const requestSchema = new db.Schema({
    trapId: String,
    date: { 
        type: Date, 
        default: Date.now 
    },
    ip: String,
    method: String,
    scheme: String,
    query: String,
    params: [{key: String, value: String}],
    cookie: String,
    headers: [{key: String, value: String}]
});

module.exports = db.model('request', requestSchema);