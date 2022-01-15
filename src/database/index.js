const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.DB_URI, (err) => {
    if (err) throw err;
    console.log("Bazaga ulanildi!");
})

const db = {
    controllers: require('./controllers'),
    models: require('./models')
};

module.exports = db;