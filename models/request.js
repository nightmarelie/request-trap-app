const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    trapId: String,
    date: { 
        type: Date, 
        default: Date.now 
    },
    ip: String,
    method: String,
    scheme: String,
    query: String,
    params: [ { key: String, value: String } ],
    cookie: String,
    headers: [ { key: String, value: String } ]
});

requestSchema.statics.findByTrapId = function(trapId, cb) {
    return this.find({ trapId }, cb).sort('-date').exec();
};

requestSchema.statics.findAllRequests = function(cb) {
    return this.aggregate([
        {
            $group: {
                _id: '$trapId',
                count: { $sum: 1 }
            }
        }
    ], cb)
    .exec();
};

module.exports = mongoose.model('request', requestSchema);