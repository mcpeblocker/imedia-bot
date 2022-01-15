const mongoose = require('mongoose');

const nasheedSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

const Nasheed = mongoose.model('Nasheed', nasheedSchema);

module.exports = Nasheed;