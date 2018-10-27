const fs = require("fs");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db");
const sign = require("./routes/signRoutes.js");
const multer = require("multer");
const flash = require("connect-flash");
const morgan = require("morgan");
const app = express();

var sess;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var upsess = req.session;
    const userId = sess.userId;
    cb(null, "public/videos/" + userId);
  },
  filename: (req, file, cb) => {
    fileExtension = file.originalname.split(".")[1]; // get file extension from original file name
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExtension);
  }
});
var upload = multer({ storage: storage });

//middlewares.
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: "videoUserLoggedIn",
    name: "videoUserLoggedIn",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/sign", sign.myRouter);

// set the view engine to ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

let sessObj = function(req, res) {
  let messages;
  sess = req.session;
  if (sess.isloggedin) {
    var obj = {
      isloggedin: true,
      name: sess.name,
      userId: sess.userId
    };
    messages = obj;
  } else {
    messages = { isloggedin: false };
  }
  return messages;
};

let getCategories = function(callback) {
  db.query(
    "SELECT * FROM categories WHERE status='Active'",
    (error, results, fields) => {
      if (error) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    }
  );
};

//Categorizing Routes
app.get("*", function(req, res, next) {
  const myDataObj = sessObj(req, res);
  if (req.url === "/") {
    return next();
  } else {
    if (!myDataObj.isloggedin) {
      res.redirect("/");
    } else {
      return next();
    }
  }
});

app.get("/", function(req, res) {
  const myDataObj = sessObj(req, res);
  getCategories(function(err, results) {
    res.render("pages/index", {
      data: myDataObj,
      sidebarData: results
    });
  });
});

app.get("/upload", function(req, res) {
  const myDataObj = sessObj(req, res);
  res.render("pages/upload", {
    v_message: req.flash("statusMsg"),
    data: myDataObj
  });
});

app.get("/manage", function(req, res) {
  const myDataObj = sessObj(req, res);
  res.render("pages/manage", {
    data: myDataObj
  });
});

app.get("/messages", function(req, res) {
  const myDataObj = sessObj(req, res);
  res.render("pages/messages", {
    infoMessages: req.flash("info"),
    data: myDataObj
  });
});

app.post("/uploadProcess", upload.single("videoFile"), function(
  req,
  res,
  next
) {
  const userId = 1;
  const videoTitle = req.body.video_title;
  const videoDesc = req.body.video_description;
  const videoDuration = "0:00";
  const category = req.body.category;
  const fileUploadedPath = req.file.filename;
  const fileUploadedOn = new Date().toLocaleString();
  const isPrivate = req.body.videoPrivate;
  let assignPrivate;
  //If Private
  if (isPrivate === "on") {
    assignPrivate = false;
  } else {
    assignPrivate = true;
  }

  let insQuery =
    "INSERT INTO `videos` (user_id, category_id, video_name, video_description, video_duration,video_upload_path, video_uploadedon, isPublic, status) VALUES ('" +
    userId +
    "', '" +
    category +
    "','" +
    videoTitle +
    "', '" +
    videoDesc +
    "', '" +
    videoDuration +
    "', '" +
    fileUploadedPath +
    "', '" +
    fileUploadedOn +
    "',  '" +
    assignPrivate +
    "', '" +
    "Active" +
    "')";
  db.query(insQuery, function(err, result) {
    if (err) {
      req.flash("statusMsg", "Record Not inserted, Try again");
      res.redirect("/upload");
    } else {
      req.flash("statusMsg", "Video added Successfully.");
      res.redirect("/upload");
    }
  });
});

app.post("/loginProcess", function(req, res) {
  var email = req.body.login_emailId;
  var password = req.body.login_password;
  sess = req.session;

  db.query(
    "SELECT * FROM users WHERE email_id = ? and password=? and status='Active' ",
    [email, password],
    function(error, results, fields) {
      if (error) {
        req.flash("info", "Query Error, Try again");
        res.redirect("/messages");
      } else {
        if (results.length > 0) {
          sess.isloggedin = true;
          sess.name = results[0].name;
          sess.userId = results[0].user_id;

          res.redirect("/");
        } else {
          req.flash(
            "info",
            "Email and password does not match, Please try again"
          );
          res.redirect("/messages");
        }
      }
    }
  );
});

app.post("/regProcess", function(req, res) {
  sess = req.session;

  const name = req.body.name;
  const phone = req.body.phone;
  const email_id = req.body.emailId;
  const password = req.body.password;
  const status = "Active";
  let insQuery =
    "INSERT INTO `users` (name, phone, email_id, password, status) VALUES ('" +
    name +
    "', '" +
    phone +
    "', '" +
    email_id +
    "', '" +
    password +
    "', '" +
    status +
    "')";

  db.query(insQuery, function(err, result) {
    if (err) {
      req.flash("info", "Error");
      res.redirect("/messages");
    } else {
      const pkId = result.insertId;
      const dir = "public/videos/" + pkId;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      sess.isloggedin = true;
      sess.name = name;
      sess.userId = pkId;
      req.flash("info", "Success!");
      res.redirect("/");
    }
  });
});

app.get("/logout", function(req, res) {
  sess = req.session;
  req.session.destroy();

  //req.flash("info", "Session cleared and User Logged Out Successfully. ");
  res.redirect("/");
});

app.listen(3000);
