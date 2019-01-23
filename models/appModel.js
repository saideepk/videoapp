const db = require("./db");
var model = {};

model.getCategories = (req, res, next) => {
  db.query("SELECT * FROM categories WHERE status = 'Active'", function(
    error,
    rows
  ) {
    if (rows.length > 0) {
      req.sidebarData = rows;
      return next();
    } else {
      req.sidebarData = [];
      return next();
    }
  });
  //console.log("Hello from appmodel");
};

model.getDashboardVideos = (req, res, next) => {
  var query =
    "SELECT * FROM videos WHERE status = 'Active' and isPublic='true' ";
  db.query(query, function(error, rows) {
    if (rows.length > 0) {
      req.dashBoardData = rows;
      return next();
    } else {
      req.dashBoardData = [];
      return next();
    }
  });
  //console.log("Hello from appmodel2");
};

//export this router to use in our index.js
module.exports = {
  getCategories: model.getCategories,
  getDashboardVideos: model.getDashboardVideos
};
