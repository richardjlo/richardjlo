const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const path = require('path');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Middleware that allows Express to serve static files.
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {title: 'Hello world'});
});

app.get('/tax-calculator', function(req, res) {
  res.render('tax-calculator', {title: 'Tax Calculator'});
});

app.post('/tax-calculator', function(req, res) {
  console.log(req.body);
});

app.listen(PORT, function() {
});
