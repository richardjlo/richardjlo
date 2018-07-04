const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');

app.use(helmet());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {title: 'Hello world'});
});

app.get('/tax-calculator', function(req, res) {
  res.render('tax-calculator', {title: 'Tax Calculator'});
});

app.listen(PORT, function() {
});
