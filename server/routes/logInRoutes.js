var express = require('express');

var OpenRouter = express.Router();

var API = require('../apis/logInApi');

OpenRouter.post('/logIn', function (req, res) {
    API.login(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    OpenRouter: OpenRouter
};
