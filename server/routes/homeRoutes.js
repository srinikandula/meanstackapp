var express = require('express');
var AuthRouter = express.Router();
var Home = require('../apis/homeApi');
// var Login = require('../apis/loginApi');

AuthRouter.post('/add', function (req, res) {
    Home.addEmploye(req.body, req, function (result) {
        res.json(result);
    });
});

AuthRouter.post('/findname', function (req, res) {
    Home.findCheckName(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    AuthRouter: AuthRouter
};