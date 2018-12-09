const express = require('express'),
      router = express.Router(),
      extractor = require('../helpers/extractor'),
      requestModel = require('../models/request');
let io;

router.get('/', (req, res) => {
    requestModel.findAllRequests()
        .then(result => res.render('request/instruction', {
            title: "Instructions",
            trapRequests: result
        }))
        .catch(err => res.end(err.message));
});

router.all('/:trap_id', (req, res) => {
    const { params: { trap_id: trapId } } = req;
    const request = new requestModel(extractor(req));
    request.save()
        .then(result => {
            io.emit('requests', result);
            io.emit(trapId, result);
            res.sendStatus(200);
        })
        .catch(err => res.status(500).send(err.message));
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

module.exports = (socketIo) => {
    io = socketIo;
    return router;
};
