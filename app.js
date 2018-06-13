const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {title: 'Hello world'});
});

app.get('/project1', function(req, res) {
  res.render('project1', {title: 'Project 1'});
});

app.listen(5000, () => console.log('Example app listening on port 5000!'));
