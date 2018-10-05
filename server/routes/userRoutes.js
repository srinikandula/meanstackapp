var express = require('express');
var AuthRouter = express.Router();

var users = require('../apis/usersApi');

AuthRouter.get('/getAll',function(req, res) {
    users.getUser(req, function(result){
        res.json(result);
    });
});

AuthRouter.delete('/remove/:id', function(req, res) {
    users.deleteUser(req.params.id, function(result) {
    res.json(result);
  });
});

module.exports = {
    AuthRouter: AuthRouter
};
