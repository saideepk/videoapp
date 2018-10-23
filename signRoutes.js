const express = require('express');
const path = require('path');
const db = require('./config/db');

const router = express.Router();

router.use(express.static(path.join(__dirname)));


router.get('/test', function(req, res) {
    res.send('GET route on things.');
});

router.get('/:name', function(req, res) {
    res.send('Name is ' + req.params.name);
    res.end();
});

router.post('/regProcess', function(req, res) {
    console.log(res);
    const name = req.body.name;
    const phone = req.body.phone;
    const email_id = req.body.emailId;
    const password = req.body.password;
    const status = "Active";

    let insQuery = "INSERT INTO `users` (name, phone, email_id, password, status) VALUES ('" +
        name + "', '" + phone + "', '" + email_id + "', '" + password + "', '" + status + "')";

    console.log(insQuery);

    // db.query(insQuery, function(err, result) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         //res.render('pages/index', { data: result });
    //         res.render('pages/index', { dataMsg: "teststsa" });
    //     }
    // });
});

//export this router to use in our index.js
module.exports = {
    msg: "Hello",
    myRouter: router
};