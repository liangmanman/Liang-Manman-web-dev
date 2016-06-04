/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function(app) {

    var userService = require("./services/user.service.server")(app); // pass app to userService
    var websiteService = require("./services/website.service.server")(app);
    var pageService = require("./services/page.service.server")(app);
    

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    app.get("/allUsers/:userName", function (req, res) {
        var username = req.params["userName"];
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
            }
        }
       // res.send(users);
    });


    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];
        res.send({message: msg});
    });
};