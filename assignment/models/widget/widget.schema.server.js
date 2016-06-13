/**
 * Created by liangmanman1 on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        order: Number,
        deletable: Boolean,
        formatted: Boolean,
        dataCreate: {type: Date, default: Date.now}

    }, {collection: "assignment.widget"});

    return WidgetSchema;
};