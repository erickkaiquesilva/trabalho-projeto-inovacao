var createError = require('http-errors');
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require("express-session");
let FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var dashRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var singinRouter = require('./routes/singin');
var loggofRouter = require('./routes/loggof');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.use('/', indexRouter);
app.use('/singin', singinRouter);
app.use('/dashboard', dashRouter);
app.use('/login',loginRouter);
app.use('/loggof', loggofRouter);

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
