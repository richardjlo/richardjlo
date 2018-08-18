// require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const path = require('path');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

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

const taxCalc = require('./routes/taxCalc.js');
app.post('/tax-calculator', function(req, res) {
  let taxInfo = taxCalc.calculateTax(req.body.salary);
  res.send(taxInfo);
});

app.get('/convert-case', function(req, res) {
  res.render('convert-case', {title: 'Convert Case'});
});

const convertCase = require('./routes/convert-case-server.js');
app.post('/convert-case', function(req, res) {
  let text = req.body.text;
  let caseType = req.body.caseType;
  let convertedText = convertCase.convertCase(text, caseType);
  res.send({
    text: convertedText,
  });
});

app.get('/lipsum', function(req, res) {
  res.render('lipsum', {title: 'Lipsum'});
});

app.get('/expense-tracker', function(req, res) {
  res.render('expense-tracker', {title: 'Expense Tracker'});
});

app.get('/weather', function(req, res) {
  res.render('weather', {title: 'Weather'});
});

const weatherApp = require('./routes/weather-server.js');
app.post('/weather', function(req, res, next) {
  weatherApp.getWeather(req.body.city, res, next);
});

app.get('/callbacks', function(req, res) {
  res.render('callbacks', {title: 'Callbacks'});
});

app.listen(PORT, function() {
});
