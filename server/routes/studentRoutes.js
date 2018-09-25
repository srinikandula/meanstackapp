var express = require('express');
var AuthRouter = express.Router();
var Students = require('../apis/studentApi');

AuthRouter.post('/add', function(req, res) {
  Students.addStudent(req.body, req, function(result) {
    res.json(result);
  });
});
AuthRouter.put('/updateStudents/:id', function(req, res) {
  Students.updateStudents(req.params.id, req.body, function(result) {
    res.json(result);
  });
});
AuthRouter.delete('/remove/:id', function(req, res) {
  Students.deleteStudent(req.params.id, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getAll', function(req, res) {
  Students.getStudents(req, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getOne/:_id', function(req, res) {
    Students.getStudent(req, function(result) {
        res.json(result);
    });
});

AuthRouter.get('/sort', function(req, res) {
  Students.sortStudents(req, function(result) {
    res.json(result);
  });
});

module.exports = {
  AuthRouter: AuthRouter
};
