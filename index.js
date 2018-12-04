const express = require('express');
const app = express();
const port = 3000;

const hbs = require('express-hbs');
const relative = require('./helpers/relative');

app.use(express.static(relative(__dirname, 'public')));
app.engine('hbs', hbs.express4({
    defaultLayout: relative(__dirname, 'views', 'template.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', relative(__dirname, 'views'));

app.get('/:trap_id/requests', (req, res) => {
    res.render('request/details', {
        trap: req.params.trap_id
    });
});

app.get('/', (req, res) => {
    res.render('request/instruction', {});
});

app.listen(port, () => console.log('Capture ger request!') );
