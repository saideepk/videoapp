const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./config/db');
var sign = require('./signRoutes.js');
const app = express();

//middlewares
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

console.log(__dirname);
// set the view engine to ejs
app.set('view engine', 'ejs');

//Categorizing Routes
app.use('/sign', sign.myRouter);


app.get('/', function(req, res) {
    db.query('SELECT * FROM adminlogin', function(err, result) {
        if (err) {
            throw err;
        } else {
            //res.render('pages/index', { data: result });
            res.render('pages/index');
        }
    });

});


app.listen(3000);