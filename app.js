var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session=require("express-session");
var bodyParser = require('body-parser');
var flash=require("connect-flash");

var setTime=require("./config/setTime");

var index = require('./routes/index');
var users = require('./routes/users');
var topic = require('./routes/topic');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
	// secret 加密用的密钥
	secret : 'suijijkdfhskjfhskjdfhskdjhdjkh112345678',
	resave:true,//每次请求都重新设置session,
	rolling:true,//每次请求都重新设置cookie,
	saveUninitialized:false,
	// 无论是否设置cookie,session,是否重新设置 false
	cookie:{
//过期时效
		maxAge:1000*60*30
	}
}));

app.use(function(req,res,next){
	res.locals.errMsg=req.flash("errMsg");
	res.locals.user=req.session.user;
	res.locals.setTime=setTime;
	next();
})


app.use('/', index);
app.use('/users', users);
app.use('/topic', topic);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
