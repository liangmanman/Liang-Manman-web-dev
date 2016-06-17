/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function(app, models) {

    var userModel =  models.userModel;
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    var auth = authorized;
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        developerModel
            .findDeveloperById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post  ('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport
            .authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
            }
        )
    );

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
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
                    res.status(400).send(error);
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
                    res.status(403).send(error);
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
                res.status(404).send(error);
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
                    res.status(404).send(error);
                }
            );
    }

};