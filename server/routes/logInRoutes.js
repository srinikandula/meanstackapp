var express = require('express');

var OpenRouter = express.Router();
var AuthRouter = express.Router();

var API = require('../apis/logInApi');
var Sup = require('../apis/SignupApi');


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

AuthRouter.get('/getAll',function(req, res) {
    Sup.getUser(req, function(result){
        res.json(result);
    });
});

OpenRouter.post('/logIn', function (req, res) {
    API.login(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    OpenRouter: OpenRouter,
    AuthRouter:AuthRouter
};
