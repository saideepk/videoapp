var express = require('express');
var app = express();

var things = require('./routes.js');
console.log(__dirname);
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');
//both index.js and things.js should be in same directory
app.use('/things', things.myRouter);

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(3000);