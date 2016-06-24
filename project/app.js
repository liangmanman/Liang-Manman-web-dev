/**
 * Created by liangmanman1 on 6/23/16.
 */
module.exports = function(app) {

    var models = require("./models/models.js")();
    // pass app to userService
    var userService = require("./services/user.service.server.js")(app, models);

};