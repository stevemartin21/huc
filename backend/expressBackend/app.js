/*
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
"C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
Connection to the database and mongo shell
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// imported model route

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var readRouter = require('./routes/read');
var updateRouter = require('./routes/update');
var deleteRouter = require('./routes/delete');

// Database initiation

let gfs;
//  Connect to the church web site with mongoose and create connetion
mongoose.connect('mongodb://localhost/churchFinal');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// Open connection and use grid fs to upload image
db.once('open', function () {
   gfs = Grid(db.db, mongoose.mongo);
  	console.log('we are connected')
  // all set!
  gfs.collection('uploads')
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// grab the images and add to fule
app.use("/images", express.static(path.join("./images")));
// creaes acceess to multiple routes and backend needed to backend and fron end
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/read', readRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
