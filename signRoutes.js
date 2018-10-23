var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.static(path.join(__dirname)));


router.get('/test', function(req, res) {
    res.send('GET route on things.');
});

router.get('/:name', function(req, res) {
    res.send('Name is ' + req.params.name);
    res.end();
});


router.post('/regProcess', function(req, res) {
    console.log(req.body);

    res.render("pages/index");
});

//export this router to use in our index.js
module.exports = {
    msg: "Hello",
    myRouter: router
};