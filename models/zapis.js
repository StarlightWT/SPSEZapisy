const mongoose = require('mongoose');

module.exports = mongoose.model('zapis', 
    new mongoose.Schema({
        Predmet:String,
        Hodina:String,
        Nadpis:String,
        Zapis:String,
}));