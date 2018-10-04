var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./server/config/config');
var app = express();
var authMiddleware = require('./server/middleware/auth');

var logIn = require('./server/routes/logInRoutes');

var Transactions = require('./server/routes/transRoutes');
var users = require('./server/routes/userRoutes');


app.set('port', config.port);
app.use(express.static('client'));

app.use(bodyParser.json({ limit: config.bodyParserLimit }));
app.use(bodyParser.urlencoded({ limit: config.bodyParserLimit, extended: true })
);
app.use(cookieParser());
app.use('/v1/login', logIn.OpenRouter);


app.use(authMiddleware);
app.use('/v1/transactions', Transactions.AuthRouter);
app.use('/v1/users', users.AuthRouter);


var server = app.listen(app.get('port'), function() {
});

module.exports = app;
