"use strict";
var jwt = require('jsonwebtoken');
var config = require('./../config/config');



function authMiddleware(req,res,next){
    var token = req.cookies.token || req.headers.token;
    jwt.verify(token,config.jwt.secret,function (err, decoded) {
        if (err) {
            res.status(401).send({status: false, message: 'Not Authorised'})
        }else{
            req.jwt = decoded;
            next();
        }
    });
}

module.exports = authMiddleware;