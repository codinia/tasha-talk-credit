var mysql = require('mysql');
var config = require('./config');

var con = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});