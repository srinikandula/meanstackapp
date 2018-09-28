var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var config = require('./server/config/config');
var app = express();

var authMiddleware = require('./server/middleware/auth');

var Home = require('./server/routes/homeRoutes');
// var User = require('./server/routes/userRoutes');
var Login = require('./server/routes/loginRoutes');
var Student = require('./server/routes/studentRoutes');
var Employee = require('./server/routes/employeRoutes');
var Department = require('./server/routes/departmentRoutes');
var Trip = require('./server/routes/tripRoutes')

app.set('port', config.port);
// app.use(morgan('dev'));
app.use(express.static('client'));
// app.use(express.static('client', {index: "/views/adminIndex.html"}));

app.use(bodyParser.json({
  limit: config.bodyParserLimit
}));
app.use(
  bodyParser.urlencoded({
    limit: config.bodyParserLimit,
    extended: true
  })
);
app.use(cookieParser());

// app.use('/v1/user', User.OpenRouter);
app.use('/v1/login', Login.OpenRouter);

app.use(authMiddleware);
app.use('v1/home', Home.AuthRouter);
app.use('/v1/students', Student.AuthRouter);
app.use('/v1/employees', Employee.AuthRouter);
app.use('/v1/departments', Department.AuthRouter);
app.use('/v1/tripes', Trip.AuthRouter);

var server = app.listen(app.get('port'), function () {
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;