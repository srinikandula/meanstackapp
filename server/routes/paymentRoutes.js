var express = require('express');
var AuthRouter = express.Router();
var payments = require('../apis/paymentApi');

AuthRouter.post('/addPayment', function (req, res) {
    payments.addPayments(req.body, req, function (result) {
        res.json(result);
    });
});

AuthRouter.get('/getAllPayments', function (req, res) {
    payments.getPayments(req, function (result) {
        res.json(result);
    });
});

AuthRouter.put('/updatePayment', function (req, res) {
    payments.updatePayment(req.body, function (result) {
        res.json(result);
    });
});
AuthRouter.get('/getOne/:_id', function (req, res) {
    payments.getOneTrip(req, function (result) {
        res.json(result);
    });
});

AuthRouter.delete('/removePayment/:_id', function (req, res) {
    payments.deletePayment(req.params._id, function (result) {
        res.json(result);
    });
});


module.exports = {
    AuthRouter: AuthRouter
};