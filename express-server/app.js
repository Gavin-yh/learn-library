var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


const session = require('express-session')
const redis = require('connect-redis')(session)

var logger = require('morgan');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blog = require('./routes/blog');


var app = express();

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//写日志
var fsWriteStream = fs.createWriteStream(path.join(__dirname, '/log', 'log.log'), {
  flags: 'a'
})

app.use(logger('combined', {
  stream: fsWriteStream
}))

//底层用body-parser 
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//将cookie解析到req.cookie
app.use(cookieParser());


//创建session 的存储位置，在blog.js中设置req.session.name时，程序就会将这个值同步到redis中
const {
  redisClient
} = require('./db/redis')
const sessionStore = new redis({
  client: redisClient
})

app.use(session({
  name: 'session-name', // 这里是cookie的name，默认是connect.sid
  secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
  // resave: true,即使session没有被修改，也保存session值，默认为true
  // saveUninitialized: false,强制未初始化的session保存到数据库
  cookie: {
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  },
  //前面的设置是将session-name的这条sesion通过cookie发送个客户端，可以用作登入验证
  store: sessionStore //将session 存在redis中
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', blog)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;