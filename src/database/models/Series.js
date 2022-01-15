const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['movie', 'cartoon']
    }
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;