/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        type: String,
        shares: [{type: mongoose.Schema.Types.ObjectId, ref: 'Music'},
            {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Music'},
            {type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
        follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

        dataCreate: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};