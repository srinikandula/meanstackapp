var express = require('express');
var AuthRouter = express.Router();
var trans = require('../apis/transApi');

AuthRouter.post('/add', function(req, res) {
    trans.addTransactions(req.body, req, function(result) {
    res.json(result);
  });
});
AuthRouter.put('/updateTransactions', function(req, res) {
    trans.updateTransactions(req.params.id, req.body, function(result) {
    res.json(result);
  });
});
AuthRouter.delete('/remove/:id', function(req, res) {
    trans.deleteTransactions(req.params.id, function(result) {
    res.json(result);
  });
});

AuthRouter.get('/getAll', function(req, res) {
    trans.getTransactions(req, function(result) {
    res.send(result);
  });
});

AuthRouter.get('/getOne/:_id', function(req, res) {
    trans.getTransaction(req, function(result) {
        res.json(result);
    });
});

AuthRouter.get('/sort', function(req, res) {
    trans.sortTransactions(req, function(result) {
    res.json(result);
  });
});

module.exports = {
  AuthRouter: AuthRouter
};
