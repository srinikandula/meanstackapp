var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./server/config/config');
var app = express();

var Student = require('./server/routes/studentRoutes');

app.set('port', config.port);
// app.use(morgan('dev'));
app.use(express.static('client'));
// app.use(express.static('client', {index: "/views/adminIndex.html"}));

app.use(bodyParser.json({limit: config.bodyParserLimit}));
app.use(bodyParser.urlencoded({limit: config.bodyParserLimit, extended: true}));
app.use(cookieParser());



// app.use('/v1/user', Users.OpenRouter);
app.use('/v1/students', Student.AuthRouter);

var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});

module.exports = app;