/**
 * Created by liangmanman1 on 6/6/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var database = mongoose.createConnection('mongodb://localhost/cs4550summer1');
    // mongoose.connect('mongodb://localhost/cs4550summer1');

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var models = {
        userModel:userModel,
        websiteModel:websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };
    return models;


};