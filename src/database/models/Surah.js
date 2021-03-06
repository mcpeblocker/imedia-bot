const mongoose = require('mongoose');

const surahSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    name: {
        type: String,
        required: true
    },
    count: String,
    place: String
});

const Surah = mongoose.model('Surah', surahSchema);

module.exports = Surah;