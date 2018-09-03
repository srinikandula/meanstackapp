var express = require('express');
var AuthRouter = express.Router();
var Students = require('../apis/studentApi');

AuthRouter.post('/add', function (req, res) {
    console.log('adding student...' + req.body)
    Students.addStudent( req.body,req, function (result) {
        res.json(result);
    });
});

AuthRouter.get('/getAll', function (req, res) {
    Students.getStudents(req, function (result) {
        res.json(result);
    });
});


module.exports = {
    AuthRouter: AuthRouter
};

