/*
  ADD EXPLICAÇÃO DESTA PARTE
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path'); 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require("express-session");
let passport = require("passport");


/*
  ADD EXPLICAÇÃO DESTA PARTE
*/
var indexRouter = require('./routes/index');
var dashRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var singinRouter = require('./routes/singin');
var loggofRouter = require('./routes/loggof');
var graficoRouter = require('./routes/grafico');
var siginAdegaRouter = require('./routes/singinAdega');
var siginAlertRouter = require('./routes/alert');
var faqRouter = require('./routes/faq');

/*
  ADD EXPLICAÇÃO DESTA PARTE
*/
var admRouter = require('./routes/adm');
var loginadmRouter = require('./routes/login-adm');
var homeadmRouter = require('./routes/homeadm');
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
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./auth/authorize')(passport);
/*
  ADD EXPLICAÇÃO DESTA PARTE
*/
app.use('/', indexRouter);
app.use('/singin', singinRouter);
app.use('/dashboard', dashRouter);
app.use('/login',loginRouter);
app.use('/loggof', loggofRouter);
app.use('/grafico', graficoRouter);
app.use('/alert', siginAlertRouter);
app.use('/singinAdega', siginAdegaRouter);
app.use('/faq', faqRouter);
/*
  ADD EXPLICAÇÃO DESTA PARTE
*/
app.use('/adm', admRouter);
app.use('/login-adm', loginadmRouter);
app.use('/homeadm', homeadmRouter);

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
