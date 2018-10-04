var mongoose = require('mongoose');
var config = require('./../config/config');

console.log('Connecting to mongo using url - ' + config.mongo.url);
mongoose.connect(config.mongo.url);



var accountSchema = new mongoose.Schema({
    userName: String,
    password: String,
    contactPhone: Number
}, {
    timestamps: true
});

var tripSchema = new mongoose.Schema({
    vehicleNumber: String,
    driverName: String,
    driverNumber: Number,
    fileUpload: String,
    from: String,
    toCitys: [],
    freightAmount: Number,
    paidAmount: Number
});

var transSchema = new mongoose.Schema({
    Date: Date,
    Name: String,
    mobileno: Number,
    tonnage: Number,
    rate: Number
});

module.exports = {
    AccountsCollection: mongoose.model('accounts', accountSchema, 'accounts'),
    tripCollection: mongoose.model('trip', tripSchema, 'trip'),
    // paymentCollection: mongoose.model('payment', paymentSchema, 'payment'),
    transCollection: mongoose.model('transactions', transSchema, 'transactions')

};