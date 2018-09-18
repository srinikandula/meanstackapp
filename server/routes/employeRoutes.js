var express = require('express');
var AuthRouter = express.Router();
var Employees = require('../apis/employeApi');

AuthRouter.post('/add', function(req, res) {
  Employees.addEmploye(req.body, req, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getAll', function(req, res) {
  Employees.getEmployees(req, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getOne/:_id', function(req, res) {
  Employees.getEmployee(req, function(result) {
    res.json(result);
  });
});

AuthRouter.delete('/remove/:_id', function(req, res) {
  Employees.deleteEmployees(req.params._id, function(result) {
    res.json(result);
  });
});

AuthRouter.delete('/remove/:name', function(req, res) {
  Employees.deleteNameEmployees(req.params.name, function(result) {
    res.json(result);
  });
});

AuthRouter.put('/updateEmp', function(req, res) {
  Employees.updateEmp(req.body, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/findgetOne', function(req, res) {
  Employees.findOneEmployees(req.query, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/findgetAll', function(req, res) {
  Employees.findEmployees(req.query, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/sort', function(req, res) {
  Employees.sortEmployees(req.query, function(result) {
    res.json(result);
  });
});

module.exports = {
  AuthRouter: AuthRouter
};

// get all -- http://localhost:3000//v1/employees/getAll
// post -- http://localhost:3000//v1/employees/add
// delete -- http://localhost:3000//v1/employees/remove/18TS120
// put -- http://localhost:3000//v1/employees/updateEmp/5b83d2b35dfa6e5580def36a
