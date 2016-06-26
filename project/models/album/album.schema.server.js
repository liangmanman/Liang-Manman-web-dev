/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var albumSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        type: String,
        description: String,
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        contains:[{type: mongoose.Schema.Types.ObjectId, ref: 'Music'}],
        dataCreate: {type: Date, default: Date.now}

    }, {collection: "project.album"});

    return albumSchema;
};