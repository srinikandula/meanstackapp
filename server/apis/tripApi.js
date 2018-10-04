var tripCollection = require('../models/schemas').tripCollection;

var Tripes = function () {};

Tripes.prototype.addTrip = function (tripData, req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    console.log('trip', tripData);
    console.log('data ' + tripData);

    // var tripDoc = new tripCollection({
    //     vehicleNumber: tripData.vehicleNumber,
    //     driverName: tripData.driverName,
    //     driverNumber: tripData.driverNumber,
    //     fileUpload: tripData.fileUpload,
    //     from: tripData.from,
    //     to: [{
    //         name: choices.name
    //     }],
    //     freightAmount: tripData.freightAmount,
    //     paidAmount: tripData.paidAmount,
    // });
    // tripDoc.save(tripDoc, function (error, document) {
    //     callback();
    // });
    var tripDoc = new tripCollection(tripData);
    tripDoc.save(tripDoc, function (error, document) {
        callback();
    });
};

Tripes.prototype.getTripes = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    tripCollection.find({}).exec(function (err, tripes) {
        retObj.status = true;
        retObj.messages.push('Success');
        retObj.tripes = tripes;
        callback(retObj);
    });
};

Tripes.prototype.updateTrip = function (tripData, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    tripCollection.findOneAndUpdate({
            _id: tripData._id
        }, {
            $set: tripData
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

Tripes.prototype.getOneTrip = function (req, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    console.log('objectId', req.params)
    tripCollection.findOne({},
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

Tripes.prototype.deleteTripes = function (id, callback) {
    var retObj = {
        status: false,
        messages: []
    };
    var query = {
        _id: id
    };

    tripCollection.remove(query, function (err, result) {
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

module.exports = new Tripes();