var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subsRouter = require('./routes/subs');
var config = require('./config');
var mysql = require('mysql');
var errorHandler = require('./middle-wares/error-handler')
var app = express();
var cors = require('cors');



//db config
var pool = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_database
});

pool.getConnection(function (err, connection) {
  if (err) console.log(err);
  else {
    console.log("connected!");
    connection.release();
  }
});

global.db = pool;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(errorHandler);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/subs', subsRouter);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
})
// catch 404 and forward to error handler


app.listen(3000 || process.env.PORT, () => {
  console.log("Server listening on port 3000")
});

module.exports = app;
