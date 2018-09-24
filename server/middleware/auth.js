"use strict";
var jwt = require('jsonwebtoken');
var config = require('./../config/config');



function authMiddleware(req,res,next){
    var token = req.cookies.token || req.headers.token;
    console.log('token....',token);
    jwt.verify(token,config.jwt.secret,function (err, decoded) {
        console.log("err........",err,"decoded.....",decoded);
    });

}

module.exports = authMiddleware;