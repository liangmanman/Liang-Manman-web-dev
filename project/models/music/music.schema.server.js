/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var musicSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        type: String,
        name: String,
        description: String,
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        belongsTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
        dataCreate: {type: Date, default: Date.now}

    }, {collection: "project.music"});

    return musicSchema;
};