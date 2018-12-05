const converter = require('./key-value-converter'),
      urlParser = require('url');

module.exports = req => {
    const {
        params: { trap_id: trapId }, 
        requestTime: date, 
        connection: { remoteAddress: ip }, 
        method, 
        protocol: scheme, 
        url, 
        params, 
        headers: { cookie: cookie }, 
        headers
    } = req;

    return {
        trapId,
        date, 
        ip, 
        method, 
        scheme, 
        query: urlParser.parse(url).query, 
        params: converter(params), 
        cookie, 
        headers: converter(headers)
    };
};
