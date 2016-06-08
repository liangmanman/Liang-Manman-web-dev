/**
 * Created by liangmanman1 on 6/7/16.
 */


module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        name: String,
        description: String,
        // widgets
        dataCreate: {type: Date, default: Date.now}
        
        }, {collection: "assignment.page"});

    return PageSchema;
};