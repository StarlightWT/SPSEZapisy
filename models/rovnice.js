const mongoose = require('mongoose');

module.exports = mongoose.model('rovnice', 
    new mongoose.Schema({
        Predmet:String,
        Nazev:String,
        Rovnice:String,
        Vypocita:String,
}));