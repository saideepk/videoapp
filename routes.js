var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(bodyParser.json()); // support json encoded bodies

router.get('/', function(req, res) {
    res.send('GET route on things.');
    res.end();
});

router.get('/:name', function(req, res) {
    res.send('Name is ' + req.params.name);
    res.end();
});

router.post('/postCall', function(req, res) {
    res.send('Name is ' + req.body.name);
    console.log('Posting Sir..');
    res.end();
});

//export this router to use in our index.js
module.exports = {
    msg: "Hello",
    myRouter: router
};