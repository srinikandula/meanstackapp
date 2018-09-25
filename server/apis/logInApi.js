var AccountsCollection = require('./../models/schemas').AccountsCollection;
var jwt = require('jsonwebtoken');
var config = require('./../config/config');


var LogIns = function(){

};


LogIns.prototype.login = function(req,callback){
    var retObj = {
      status:false,
      messages:[]
    };
    var logInData = req.body;
    AccountsCollection.findOne({userName:logInData.userName},function(err,user){
        if(err || !user){
            retObj.status = false;
            retObj.messages.push("Error in loging the user",JSON.stringify(err));
            callback(retObj);
        }else if(user.password === logInData.password){
            retObj.status = true;
            retObj.userName = user.userName;
            retObj._id = user._id;

            var obj = {
                id: user._id,
                userName: user.userName,
                contactPhone: user.contactPhone
            };
            jwt.sign(obj,config.jwt.secret,config.jwt.options,function(err,token){
                if(err){
                    retObj.status = false;
                    retObj.messages.push("Error in loging the user",JSON.stringify(err));
                    callback(retObj);
                }else{
                    retObj.messages.push("Success");
                    retObj.token = token;
                    callback(retObj);
                }
            });

        }
    });
};

module.exports = new LogIns();