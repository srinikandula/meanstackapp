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



var transSchema = new mongoose.Schema({
    Date: Date,
    Name: String,
    mobileno: Number,
    tonnage: Number,
    rate: Number
});

module.exports = {
    AccountsCollection: mongoose.model('accounts', accountSchema, 'accounts'),
    transCollection: mongoose.model('transactions', transSchema, 'transactions')

};