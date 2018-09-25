var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./server/config/config');
var app = express();
var authMiddleware = require('./server/middleware/auth');

var logIn = require('./server/routes/logInRoutes');

var Student = require('./server/routes/studentRoutes');
var Employee = require('./server/routes/employeRoutes');
var Department = require('./server/routes/departmentRoutes');

app.set('port', config.port);
app.use(express.static('client'));

app.use(bodyParser.json({ limit: config.bodyParserLimit }));
app.use(
  bodyParser.urlencoded({ limit: config.bodyParserLimit, extended: true })
);
app.use(cookieParser());
app.use('/v1/login', logIn.OpenRouter);


app.use(authMiddleware);
app.use('/v1/employees', Employee.AuthRouter);
app.use('/v1/students', Student.AuthRouter);
app.use('/v1/departments', Department.AuthRouter);


var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
