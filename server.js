const express = require('express');
const mysql = require('mysql');
const app = express();
var db = require('./config/db');
var things = require('./routes.js');

//middlewares
app.use(express.static(__dirname));
// set the view engine to ejs
app.set('view engine', 'ejs');

//both index.js and things.js should be in same directory
app.use('/things', things.myRouter);

// index page 
app.get('/', function(req, res) {
    var data = [];
    db.query("select * from adminlogin", function(err, response) {
        if (err) {
            console.log("error: ", err);
        } else {
            // console.log(response[0]);
            data.push(response[0]);
            console.log(data);

        }
    });

    //console.log(data);

    res.render('pages/index', {
        myData: data
    });
});





app.listen(3000);