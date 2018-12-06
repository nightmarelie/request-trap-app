const express = require('express'),
      router = express.Router()
      extractor = require('../helpers/extractor')
      requestModel = require('../models/request');

router.get('/', (req, res) => {
    requestModel.findAllRequests()
        .then(result => res.render('request/instruction', {
            title: "Instructions",
            trapRequests: result
        }))
        .catch(err => res.end(err.message));
});

router.all('/:trap_id', (req, res) => {
    const request = new requestModel(extractor(req));
    request.save(function (err, req) {
        if (err) console.error(err);

        console.log(req);
    });
    res.end();
});

router.get('/:trap_id/requests', (req, res) => {
    const { params: { trap_id: trapId } } = req;

    requestModel.findByTrapId(trapId)
        .then(result => res.render('request/details', {
            title: `Request ${trapId} details`,
            trap: trapId,
            requests: result
        }))
        .catch(err => res.end(err.message));
});

module.exports = router;
