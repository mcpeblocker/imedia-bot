const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true
    },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series',
    },
    name: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;