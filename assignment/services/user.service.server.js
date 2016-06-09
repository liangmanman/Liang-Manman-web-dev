/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function(app, models) {

    var userModel =  models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    
    function createUser(req, res) {
        console.log("into register");
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
    }

    
    function getUsers(req, res) {
        var userName = req.query["username"];
        var passWord = req.query["password"];
        if (userName && passWord) {
            findUserByCredentials(userName, passWord, res);
        }
        else if (userName) {
            findUserByUsername(userName, res);
        }
        else {
            res.send(users);
        }
    }

    
    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (user == null) {
                        res.status(404).send("User not exist");
                    }
                    else {
                        res.send(user);
                    }
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
    }

    function findUserByUsername(username, res) {
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }


    
    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.send(user)
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    
    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function(user) {
                res.send(200);
            }, function(error) {
                res.status(404).send("Unable to update user with ID: " + userId);
            });
        
    }

    
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + userId);
                }
            );
    }

};