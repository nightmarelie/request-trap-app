const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    res.render('request/instruction', {});
});

router.all('/:trap_id', (req, res) => {
    console.log(req);
    res.end('Handled');
});

router.get('/:trap_id/requests', (req, res) => {
    res.render('request/details', {
        trap: req.params.trap_id
    });
});

module.exports = router;
