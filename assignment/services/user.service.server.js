/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function(app, models) {

    var userModel =  models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    function createUser(req, res) {
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

        // for (var i in users) {
        //     if (users[i].username===newUser.username) {
        //         res.status(400).send("Username " + newUser.username + " is already in use");
        //         return;
        //     }
        // }
        // newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        // res.json(newUser);
    }

    app.get("/api/user", getUsers);
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
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );



        // for (var i in users) {
        //     if (users[i].username === username && users[i].password === password) {
        //         res.send(users[i]) ;
        //         return;
        //     }
        // }
        // res.status(400).send("Please verify your username and password");
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


    app.get("/api/user/:userId", findUserById);
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
        // for (var i in users) {
        //     if (users[i]._id === userId) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    app.put("/api/user/:userId", updateUser);
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
        
        // for (var i in users) {
        //     if (users[i]._id === userId) {
        //         users[i].username = newUser.username;
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("User with ID: "+ userId +" not found");
    }

    app.delete("/api/user/:userId", deleteUser);
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
        // for (var i in users) {
        //     if (users[i]._id === userId) {
        //         users.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove user with ID: " + userId);
    }

};