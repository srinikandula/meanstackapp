var express = require('express');
var AuthRouter = express.Router();
var Tripes = require('../apis/tripApi');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

AuthRouter.post('/addTrip',multipartyMiddleware, function (req, res) {
    Tripes.addTrip(req.body.content,req.files.files,req, function (result) {
        res.json(result);
    });
});

AuthRouter.get('/getAllTripes', function (req, res) {
    Tripes.getTripes(req, function (result) {
        res.json(result);
    });
});
AuthRouter.post('/updateTrip',multipartyMiddleware, function (req, res) {
    Tripes.updateTrip(req.body.content,req.files.files,function (result) {
        res.json(result);
    });
});
AuthRouter.get('/getOne/:_id', function (req, res) {
    Tripes.getOneTrip(req.params._id, function (result) {
        res.json(result);
    });
});

AuthRouter.delete('/removeTrip/:_id', function (req, res) {
    Tripes.deleteTripes(req.params._id, function (result) {
        res.json(result);
    });
});

AuthRouter.delete('/removeDoc', function (req, res) {
    Tripes.removeDoc(req.query, function (result) {
        res.json(result);
    });
});

module.exports = {
    AuthRouter: AuthRouter
};