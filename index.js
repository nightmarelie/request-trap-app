const app = require('express')();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello request trap app');
});

app.listen(port, () => console.log('Capture ger request!') );
