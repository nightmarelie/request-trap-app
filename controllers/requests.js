const express = require('express'),
      router = express.Router()
      extractor = require('../helpers/extractor')
      requestModel = require('../models/request');

router.get('/', (req, res) => {
    res.render('request/instruction', {
        title: "Instructions"
    });
});

router.all('/:trap_id', (req, res) => {
    const request = new requestModel(extractor(req));
    request.save(function (err, req) {
        if (err) console.error(err);

        console.log(req);
    });
    res.end('Handled');
});

router.get('/:trap_id/requests', (req, res) => {
    const { params: { trap_id: trapId } } = req;
    res.render('request/details', {
        title: `Request ${trapId} details`,
        trap: trapId
    });
});

module.exports = router;
