var express = require('express');
var AuthRouter = express.Router();
var Tripes = require('../apis/tripApi');

AuthRouter.post('/addTrip', function (req, res) {
    Tripes.addTrip(req.body, req, function (result) {
        res.json(result);
    });
});

AuthRouter.get('/getAllTripes', function (req, res) {
    Tripes.getTripes(req, function (result) {
        res.json(result);
    });
});

AuthRouter.put('/updateTrip', function (req, res) {
    Tripes.updateTrip(req.body, function (result) {
        res.json(result);
    });
});
AuthRouter.get('/getOne/:_id', function (req, res) {
    Tripes.getOneTrip(req, function (result) {
        res.json(result);
    });
});

AuthRouter.delete('/removeTrip/:_id', function (req, res) {
    Tripes.deleteTripes(req.params._id, function (result) {
        res.json(result);
    });
});


module.exports = {
    AuthRouter: AuthRouter
};