const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    // channelId: {
    //     type: String,
    //     required: true
    // },
    name: String,
    link: String
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;