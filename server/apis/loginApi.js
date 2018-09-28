var employeCollection = require('../models/schemas').employeCollection;
var jwt = require('jsonwebtoken');
var Employees = function () {};
var config = require('../config/config.json');

Employees.prototype.loginUser = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var logInData = req.body;
    console.log('logIndata', logInData);
    employeCollection.findOne({
        username: logInData.username
    }, function (err, user) {
        if (err || !user) {
            retObj.status = false;
            retObj.messages.push("Error in loging the user", JSON.stringify(err));
            callback(retObj);
        } else if (user.password === logInData.password) {
            retObj.status = true;
            retObj.userName = user.username;
            retObj._id = user._id;

            var obj = {
                id: user._id,
                username: user.username,
                // contactPhone: user.contactPhone
            };
            jwt.sign(obj, config.jwt.secret, config.jwt.options, function (err, token) {
                if (err) {
                    retObj.status = false;
                    retObj.messages.push("Error in loging the user", JSON.stringify(err));
                    callback(retObj);
                } else {
                    retObj.messages.push("Success");
                    retObj.token = token;
                    callback(retObj);
                }
            });
        }
    });
};

module.exports = new Employees();