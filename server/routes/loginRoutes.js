var express = require('express');
var OpenRouter = express.Router();
var Login = require('../apis/loginApi');
var Sup = require('../apis/SignupApi');


OpenRouter.post('/login', function (req, res) {
    Login.login(req, function (result) {
        res.json(result);
    });
});

OpenRouter.post('/findCheckName', function (req, res) {
    Sup.findCheckName(req, function (result) {
        res.json(result);
    });
});

OpenRouter.post('/signUp',function(req, res) {
    Sup.addUser(req.body,req, function(result){
        res.json(result);
    });
});

OpenRouter.post('/logIn', function (req, res) {
    API.login(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    OpenRouter: OpenRouter
};