const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
    token: {type: String, required: true}
},{
    versionKey : false
})

const BlacklistModel = mongoose.model('blacklistedToken', blacklistSchema);

module.exports = BlacklistModel;