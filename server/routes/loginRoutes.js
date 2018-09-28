var express = require('express');
var OpenRouter = express.Router();
var Login = require('../apis/loginApi');

OpenRouter.post('/login', function (req, res) {
    Login.loginUser(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    OpenRouter: OpenRouter
};