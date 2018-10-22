var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'videoapp'
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected to Database...')
});

module.exports = connection;