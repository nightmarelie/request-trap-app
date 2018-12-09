const express = require('express'),
      app = express(),
      port = 3000,
      hbs = require('express-hbs');
      relative = require('./helpers/relative'),
      linkHelper = require('./views/helpers/link')(hbs),
      http = require('http').Server(app),
      io = require('socket.io')(http);

hbs.registerHelper('link', linkHelper);

app.engine('hbs', hbs.express4({
    partialsDir: relative('views/partials'),
    defaultLayout: relative(__dirname, 'views/template.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', relative(__dirname, 'views'));

io.on('connection', function(socket) {
    console.log('Client connected');
    socket.on('disconnect', function(){
        console.log('Client disconnected');
    });
});

app.use(express.static(relative(__dirname, 'public')));
app.use(require(relative(__dirname, 'middlewares/request-time')));
app.use(require(relative(__dirname, 'middlewares/ignore-favicon')));
app.use(require(relative(__dirname, 'controllers/requests'))(io));

http.listen(port, () => console.log('Capture request!'));
