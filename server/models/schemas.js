var mongoose = require('mongoose');
var config = require('./../config/config');

console.log('Connecting to mongo using url - ' + config.mongo.url);
mongoose.connect(config.mongo.url);


var accountsSchema=new mongoose.Schema({
    userName:String,
    password:String,
    contactPhone:Number
})
var tripSchema = new mongoose.Schema({

    date:Date,
    truckNumber: String,
    dispatchDate:Date,
    driverNumber: Number,
    lrNumber:String,
    destination:String,
    partyName:String,
    partyPhoneNumber:Number,
    unloadingDate:Date,
    quantity:Number,
    freightPerMt:Number,
    unloadingCharges:Number,
    totalAmountPaid:Number,
    invoiceAmount:Number,
    profitOrLoss:Number,
    serialNo:Number,
    unloadingPoints: [{
        index: 0,
        name:String
    }],
    documents:[]
})
var paymentSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    discription: String
})
var transSchema = new mongoose.Schema({
    Date: Date,
    Name:String,
    mobileno: Number,
    tonnage: Number,
    rate: Number
});

module.exports = {
    tripCollection: mongoose.model('trip', tripSchema, 'trip'),
    paymentCollection: mongoose.model('payment', paymentSchema, 'payment'),
    AccountsCollection: mongoose.model('accounts', accountsSchema, 'accounts'),
    transCollection: mongoose.model('transactions', transSchema, 'transactions')
};