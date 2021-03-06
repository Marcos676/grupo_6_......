/* VARIABLES E IMPORTACIONES */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const methodOverride =  require('method-override')
const session = require('express-session')

/* Requerimientos de rutas */
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter')



/* CONFIGURACIONES */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method')); 

app.use(session( { secret: "nuestro mensaje secreto"}))

/*RUTAS*/

app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/usuario', usersRouter);
app.use('/admin', adminRouter);

/* app.use(localsCheck); *//* Falta requerir localsCheck */
/* app.use(cookieCheck); *//* Falta requerir cookiesCheck */


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
