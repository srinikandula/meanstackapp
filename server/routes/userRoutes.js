ar express = require('express');
var AuthRouter = express.Router();
var Users = require('../apis/userApi');

AuthRouter.post('/add/register', function (req, res) {
    Users.addUser(req.body, req, function (result) {
        res.json(result);
    });
});

AuthRouter.get('/getAll', function (req, res) {
    res.render('index', { title: 'Express'})
    Users.getUsers(req, function (result) {
        res.json(result);
    });
});

module.exports = {
    AuthRouter: AuthRouter
};