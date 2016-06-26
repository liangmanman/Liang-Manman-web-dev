/**
 * Created by liangmanman1 on 6/23/16.
 */
module.exports = function() {

    var connectionString = 'mongodb://127.0.0.1:27017/cs4550project';
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var musicModel = require("./music/music.model.server.js")();
    var albumModel = require("./album/album.model.server.js")();

    var models = {
        userModel: userModel,
        musicModel: musicModel,
        albumModel: albumModel
    };
    return models;


};