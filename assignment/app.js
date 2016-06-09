/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function(app) {

    var models = require("./models/models.js")();

    var userService = require("./services/user.service.server.js")(app, models); // pass app to userService
    var websiteService = require("./services/website.service.server.js")(app, models);
    var pageService = require("./services/page.service.server.js")(app, models);
    var widgetService = require("./services/widget.service.server.js")(app, models);

};