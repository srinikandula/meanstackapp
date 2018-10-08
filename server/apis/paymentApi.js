var paymentCollection = require('../models/schemas').paymentCollection;
var Payments = function () {};

Payments.prototype.addPayments = function (paymentData, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var paymentDoc = new paymentCollection(paymentData);
    paymentDoc.save(paymentDoc, function (err, document) {
        if(err){
            retObj.status=false;
            retObj.messages.push("please try again");
            callback(retObj);
        }else{
            retObj.status=true;
            retObj.messages.push("Payment added successfully");
            callback(retObj);
        }
    });
};
Payments.prototype.getPayments=function(req,callback){
    var retObj = {
        status: false,
        messages: []
    };
    paymentCollection.find({}).exec(function(err,payments){
        if(payments)
        {
            retObj.status=true;
            retObj.messages.push('Success');
            retObj.payments=payments;
            callback(retObj);
        }

    })
}
Payments.prototype.getOneTrip = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query=req.params;
    console.log('objectId', req.params)
    paymentCollection.findOne(query,
        function (err, result) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('error in updating' + JSON.stringify(err));

            } else {
                console.log('trip',result);
                retObj.status = true;
                retObj.messages.push('Successfully updated');
                retObj.data = result;
                callback(retObj);
            }
        }
    );
};
Payments.prototype.updatePayment = function (paymentData, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    paymentCollection.findOneAndUpdate({
            _id: paymentData._id
        }, {
            $set: paymentData
        },
        function (err, result) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('error in updating' + JSON.stringify(err));
                // callback(retObj);
            } else {
                retObj.status = true;
                retObj.messages.push('Successfully updated');
                retObj.data = result;
                callback(retObj);
            }
        }
    );
};
Payments.prototype.deletePayment = function (id, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {
        _id: id
    };

    paymentCollection.remove(query, function (err, result) {
        if (err) {
            retObj.status = false;
            retObj.messages.push('error while deleting' + JSON.stringify(err));
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.messages.push('successfully deleted');
            retObj.data = result;
            callback(retObj);
        }
    });
};
module.exports= new Payments();