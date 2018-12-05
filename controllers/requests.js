const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    res.render('request/instruction', {
        title: "Instructions"
    });
});

router.all('/:trap_id', (req, res) => {
    console.log(req);
    res.end('Handled');
});

router.get('/:trap_id/requests', (req, res) => {
    const trapId = req.params.trap_id;
    res.render('request/details', {
        title: `Request ${trapId} details`,
        trap: trapId
    });
});

module.exports = router;
