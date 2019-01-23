const fs = require("fs");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const flash = require("connect-flash");
const morgan = require("morgan");
const db = require("./models/db");
const appModel = require("./models/appModel.js");
const sign = require("./routes/signRoutes.js");
const app = express();

var sess;
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var upsess = req.session;
    console.log("public/media/" + req.session.userId);
    cb(null, "public/media/" + req.session.userId);
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

function renderPage(req, res, next) {
  const myDataObj = sessObj(req, res);
  res.render("pages/index", {
    data: myDataObj,
    sideBar: req.sidebarData,
    dashboard: req.dashBoardData
  });
}

//Categorizing Routes
app.get("*", function(req, res, next) {
  sess = req.session;
  console.log("Any", req.url);
  var string = req.url;
  var ex1 = string.includes("/category/");
  var ex2 = string.includes("/video/");
  var ex3 = string.includes("Process");
  var ex4 = string.includes("/logout");

  if (
    req.url === "/" ||
    ex1 === true ||
    ex2 === true ||
    ex3 === true ||
    ex4 === true
  ) {
    return next();
  } else {
    if (!sess.isloggedin) {
      res.redirect("/");
    } else {
      return next();
    }
  }
});

app.get("/upload", appModel.getCategories, function(req, res) {
  const myDataObj = sessObj(req, res);
  res.render("pages/upload", {
    v_message: req.flash("statusMsg"),
    data: myDataObj,
    sideBar: req.sidebarData
  });
});

app.get("/", appModel.getCategories, appModel.getDashboardVideos, renderPage);

app.get("/searchProcess", appModel.getCategories, function(req, res, next) {
  let keyword = req.query.keyword;
  let trimString = keyword.trim();
  const myDataObj = sessObj(req, res);
  var query =
    "SELECT * FROM videos WHERE video_name like '%" +
    trimString +
    "%' and status='Active' and isPublic='true' ";

  db.query(query, function(error, rows) {
    if (rows && rows !== undefined && rows.length > 0) {
      const resultsData = { count: rows.length, keywordTxt: trimString };
      const catVideoData = rows;
      res.render("pages/search", {
        data: myDataObj,
        sideBar: req.sidebarData,
        dashboard: catVideoData,
        resultDetails: resultsData
      });
    } else {
      const resultsData = { count: 0, keywordTxt: trimString };

      res.render("pages/search", {
        data: myDataObj,
        sideBar: req.sidebarData,
        dashboard: [],
        resultDetails: resultsData
      });
    }
  });
});

app.get("/category/:category/:id", appModel.getCategories, function(
  req,
  res,
  next
) {
  console.log("cat page hit");
  const myDataObj = sessObj(req, res);
  var query =
    "SELECT * FROM videos WHERE category_id =" +
    req.params.id +
    " and status='Active'  and isPublic='true' order by video_id desc ";
  db.query(query, function(error, rows) {
    if (rows && rows !== undefined && rows.length > 0) {
      const catVideoData = rows;

      res.render("pages/category", {
        data: myDataObj,
        sideBar: req.sidebarData,
        dashboard: catVideoData,
        catName: req.params.category
      });
    } else {
      res.render("pages/category", {
        data: myDataObj,
        sideBar: req.sidebarData,
        dashboard: [],
        catName: req.params.category
      });
    }
  });
});

app.get("/video/:id", appModel.getCategories, function(req, res, next) {
  const myDataObj = sessObj(req, res);
  var query2 =
    "SELECT * FROM videos WHERE video_id =" +
    req.params.id +
    " and status='Active';" +
    "SELECT * FROM comments WHERE video_id =" +
    req.params.id +
    " and status='Active';";
  db.query(query2, function(error, rows) {
    if (rows[0] && rows[0] !== undefined && rows[0].length > 0) {
      const queryVideoData = rows[0][0];
      const queryCommentsData = rows[1];

      var count = rows[0][0].video_views + 1;
      let updateQuery =
        "update videos set video_views=" +
        count +
        " where video_id=" +
        req.params.id +
        "";
      db.query(updateQuery, function(err, result) {
        if (err) {
          console.log("Unable to update video count");
        } else {
          console.log("Video Count Updated");
        }
      });

      res.render("pages/videoPage", {
        v_message: req.flash("statusMsg"),
        data: myDataObj,
        sideBar: req.sidebarData,
        videoData: queryVideoData,
        commentData: queryCommentsData
      });
    } else {
      res.redirect("/");
    }
  });
});

app.get("/manage", appModel.getCategories, function(req, res, next) {
  console.log("manage page hit");
  sess = req.session;
  const myDataObj = sessObj(req, res);
  var query = "SELECT * FROM videos WHERE user_id =" + sess.userId + "  ";
  db.query(query, function(error, rows) {
    if (rows && rows !== undefined && rows.length > 0) {
      const manageVideoData = rows;
      res.render("pages/manage", {
        data: myDataObj,
        sideBar: req.sidebarData,
        manageData: manageVideoData
      });
    } else {
      res.render("pages/manage", {
        data: myDataObj,
        sideBar: req.sidebarData,
        manageData: []
      });
    }
  });
});
app.get("/messages", appModel.getCategories, function(req, res) {
  const myDataObj = sessObj(req, res);
  res.render("pages/messages", {
    infoMessages: req.flash("info"),
    data: myDataObj,
    sideBar: req.sidebarData
  });
});

app.post(
  "/uploadProcess",
  upload.fields([
    {
      name: "videoThumb",
      maxCount: 1
    },
    {
      name: "videoFile",
      maxCount: 1
    }
  ]),
  function(req, res, next) {
    const userId = req.session.userId;
    const videoTitle = req.body.video_title;
    const videoDesc = req.body.video_description;
    const category = req.body.category;
    const thumbUploadedPath = req.files["videoThumb"][0].filename;
    const videoUploadedPath = req.files["videoFile"][0].filename;
    const fileUploadedOn = new Date().toLocaleString();
    const isPublic = req.body.videoPublic;
    let assignPublic;
    //If Private
    if (isPublic === "on") {
      assignPublic = true;
    } else {
      assignPublic = false;
    }

    let insQuery =
      "INSERT INTO `videos` (user_id, category_id, video_name,video_description,video_thumbnail,video_upload_path, video_uploadedon, isPublic, status) VALUES ('" +
      userId +
      "', '" +
      category +
      "','" +
      videoTitle +
      "', '" +
      videoDesc +
      "', '" +
      thumbUploadedPath +
      "', '" +
      videoUploadedPath +
      "', '" +
      fileUploadedOn +
      "',  '" +
      assignPublic +
      "', '" +
      "Active" +
      "')";
    db.query(insQuery, function(err, result) {
      if (err) {
        console.log(err);
        req.flash("statusMsg", "Record Not inserted, Try again");
        res.redirect("/upload");
      } else {
        req.flash("statusMsg", "Video added Successfully.");
        res.redirect("/upload");
      }
    });
  }
);

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
      const dir = "public/media/" + pkId;
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

app.post("/commentsProcess", function(req, res) {
  const name = req.body.comment_name;
  const email_id = req.body.comment_email;
  const phone = req.body.comment_phone;
  const comments = req.body.comments;
  const video_id = req.body.video_id;

  let insQuery =
    "INSERT INTO `comments` (video_id,name,phone, email, comments) VALUES ('" +
    video_id +
    "', '" +
    name +
    "', '" +
    phone +
    "', '" +
    email_id +
    "', '" +
    comments +
    "')";

  db.query(insQuery, function(err, result) {
    if (err) {
      req.flash("info", "Error");
      res.redirect("/messages");
    } else {
      req.flash("statusMsg", "Comment added Successfully.");
      res.redirect("/video/" + video_id);
    }
  });
});

app.get("/logout", function(req, res) {
  console.log("Logged out sessions");
  sess = req.session;
  req.session.destroy();

  //req.flash("info", "Session cleared and User Logged Out Successfully. ");
  res.redirect("/");
});

app.listen(3000);
