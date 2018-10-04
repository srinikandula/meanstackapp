var transCollection = require('../models/schemas').transCollection;
var async = require('async');
var _ = require('underscore');

var Transactions = function () {};

Transactions.prototype.addTransactions = function (transData, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var transDoc = new transCollection({
        Date: transData.Date,
        Name: transData.Name,
        mobileno: transData.mobileno,
        tonnage: transData.tonnage,
        rate: transData.rate
    });
    transDoc.save(transDoc, function (error, document) {
        callback();
    });
};

Transactions.prototype.getTransactions = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };

    transCollection.find({}).exec(function (err, transactions) {
        retObj.status = true;
        retObj.messages.push('Success');
        retObj.transactions = transactions;
        callback(retObj);
    });
};


Transactions.prototype.getTransaction = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {
        _id: req.params._id
    };

    transCollection.findOne(query, function (err, result) {
        if (err) {
            retObj.status = false;
            retObj.messages.push('error while finding' + JSON.stringify(err));
            callback(retObj);
        } else {
            retObj.status = true;
            retObj.messages.push('successfully');
            retObj.data = result;
            callback(retObj);
        }
    });
};

// ID Delete
Transactions.prototype.deleteTransactions = function (id, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {
        _id: id
    };

    transCollection.remove(query, function (err, result) {
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

//  Name Delete
// Transactions.prototype.deleteNameTransactions = function (name, callback) {
//     var retObj = {
//         status: false,
//         messages: []
//     };
//     var query = {
//         name: name
//     };
//     transCollection.remove(query, function (err, result) {
//         if (err) {
//             retObj.status = false;
//             retObj.messages.push('error while deleting' + JSON.stringify(err));
//             callback(retObj);
//         } else {
//             retObj.status = true;
//             retObj.messages.push('successfully deleted');
//             retObj.data = result;
//             callback(retObj);
//         }
//     });
// };

Transactions.prototype.updateTransactions = function (id, transData, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    transCollection.findOneAndUpdate({
            _id: transData._id
        }, {
            $set: transData
        },
        function (err, result) {
            if (err) {
                retObj.status = false;
                retObj.messages.push('error in updating' + JSON.stringify(err));
                callback(retObj);
            } else {
                retObj.status = true;
                retObj.messages.push('Successfully updated');
                retObj.data = result;
                callback(retObj);
            }
        }
    );
};

// Transactions.prototype.findOneTransaction = function (query, callback) {
//     var retObj = {
//         status: false,
//         messages: []
//     };
//     transCollection.find({
//             name: query.name
//         },
//         function (err, transaction) {
//             retObj.status = true;
//             retObj.messages.push('Success');
//             retObj.transaction = transaction;
//             callback(retObj);
//         }
//     );
// };

// Transactions.prototype.findTransactions = function (req, callback) {
//     var retObj = {
//         status: false,
//         messages: []
//     };
//     var query = {};
//     if (req.name != null) {
//         query.name = {
//             $regex: req.name,
//             $options: 'i'
//         };
//     }
//     if (req.age != null) {
//         query.age = req.age;
//     }
//     transCollection.find(query).exec(function (err, transactions) {
//         retObj.status = true;
//         retObj.messages.push('Success');
//         retObj.employees = employees;
//         callback(retObj);
//     });
// };

Transactions.prototype.sortTransactions = function (tonnage, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {};
    transCollection.find(query)
        .sort({
            tonnage: -1
        })
        .exec(function (err, Transactions) {
            retObj.status = true;
            retObj.messages.push('Success');
            retObj.Transactions = Transactions;
            callback(retObj);
        });
};


module.exports = new Transactions();