var express = require('express');
var AuthRouter = express.Router();
var Departments = require('../apis/departmentApi');

AuthRouter.post('/depAdd', function(req, res) {
  Departments.addDep(req.body, req, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getAllDep', function(req, res) {
  Departments.getDep(req, function(result) {
    res.json(result);
  });
});

module.exports = {
  AuthRouter: AuthRouter
};
