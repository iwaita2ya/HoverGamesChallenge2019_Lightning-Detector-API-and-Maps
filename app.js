const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routers
const indexRouter = require('./routes/index');
const deviceRouter = require('./routes/device');
const logRouter = require('./routes/log');
const mapRouter = require('./routes/map');

const app = express();

// load config file associated with its environment
// console.log('dotenv path: ', 'config/.env.' + app.get('env'));
require('dotenv').config({
  debug: true,
  path: 'config/.env.' + app.get('env')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('x-powered-by', false); // disable x-powered-by on response

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ROUTING
 */
app.use('/', indexRouter);
app.use('/device', deviceRouter);
app.use('/log', logRouter);
app.use('/map', mapRouter);

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
