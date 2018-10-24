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

//middlewares
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs');

//Categorizing Routes
app.use('/sign', sign.myRouter);

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/upload', function(req, res) {
    res.render('pages/upload');
});

app.post('/uploadProcess', upload.single('videoFile'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
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
        assignPrivate = 0;
    } else {
        assignPrivate = 1;
    }

    let insQuery = "INSERT INTO `videos` (user_id, category_id, video_name, video_description, video_duration,video_upload_path, video_uploadedon, isPublic, status) VALUES ('" +
        userId + "', '" + category + "','" + videoTitle + "', '" + videoDesc + "', '" + videoDuration + "', '" + fileUploadedPath + "', '" + fileUploadedOn + "',  '" + assignPrivate + "', '" + "Active" + "')";
    console.log(insQuery);
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