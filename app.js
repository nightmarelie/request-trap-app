const express = require('express'),
      app = express(),
      port = 3000,
      hbs = require('express-hbs');
      relative = require('./helpers/relative');

app.use(express.static(relative(__dirname, 'public')));
app.engine('hbs', hbs.express4({
    defaultLayout: relative(__dirname, 'views/template.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', relative(__dirname, 'views'));

app.use(require(relative(__dirname, 'controllers/requests')));

app.listen(port, () => console.log('Capture request!'));
