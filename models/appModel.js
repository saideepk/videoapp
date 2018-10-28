// const db = require("./db");
// var model = {};
// model.getVideoDetails = function(id) {
//   db.query(
//     "SELECT * FROM videos WHERE video_id = ? and status='Active' ",
//     [id],
//     function(error, results) {
//       if (error) {
//         console.log("Video not available");
//       } else {
//         if (results.length > 0) {
//           req.videoData = results;
//           return next();
//         }
//       }
//     }
//   );
// };

// //export this router to use in our index.js
// module.exports = {
//   getVideoDetails: model.getVideoDetails
// };
