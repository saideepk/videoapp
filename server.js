const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const sign = require('./routes/signRoutes.js');
const multer = require('multer');
const app = express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos/1')
    },
    filename: (req, file, cb) => {
        fileExtension = file.originalname.split('.')[1] // get file extension from original file name
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension)
    }
});
var upload = multer({ storage: storage });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middlewares
app.use(express.static(path.join(__dirname)));


//Categorizing Routes
app.use('/sign', sign.myRouter);

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/upload', function(req, res) {
    res.render('pages/upload');
});

app.get('/messages/:status/:page', function(req, res) {
    const status = req.params.status;
    const page = req.params.page;
    var data = {}
    if (status === "0" && page === "registration") {
        data.statuscode = status;
        data.text = "Registration Failed, please try again";
    } else if (status === "1" && page === "registration") {
        data.statuscode = status;
        data.text = "Successsfully Registered, Now Login and Upload Videos..";
    } else if (status === "0" && page === "login") {
        data.statuscode = status;
        data.text = "Login Failed, please try again";
    } else {
        data.statuscode = 0;
        data.text = "No Messages for now";
    }

    console.log(data);
    res.render('pages/messages', {
        statuscode: data.statuscode,
        text: data.text
    });
});

app.post('/uploadProcess', upload.single('videoFile'), function(req, res, next) {
    // req.file is the `avatar` file
    const userId = 1;
    const videoTitle = req.body.video_title;
    const videoDesc = req.body.video_description;
    const videoDuration = "5:08";
    const category = req.body.category;
    const fileUploadedPath = req.file.filename;
    const fileUploadedOn = new Date().toLocaleString();
    const isPrivate = req.body.videoPrivate;
    let assignPrivate;
    //If Private
    if (isPrivate === 'on') {
        assignPrivate = false;
    } else {
        assignPrivate = true;
    }

    let insQuery = "INSERT INTO `videos` (user_id, category_id, video_name, video_description, video_duration,video_upload_path, video_uploadedon, isPublic, status) VALUES ('" +
        userId + "', '" + category + "','" + videoTitle + "', '" + videoDesc + "', '" + videoDuration + "', '" + fileUploadedPath + "', '" + fileUploadedOn + "',  '" + assignPrivate + "', '" + "Active" + "')";
    db.query(insQuery, function(err, result) {
        if (err) {
            throw err;
        } else {
            //res.render('pages/index', { data: result });
            res.redirect('/upload');
        }
    });

})



app.listen(3000);