const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['nasheed', 'surah']
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;