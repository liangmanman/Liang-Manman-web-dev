/**
 * Created by liangmanman1 on 6/1/16.
 */
module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getUsers);
    function getUsers(req, res) {
        var userName = req.query["username"];
        var passWord = req.query["password"];
        if (userName && passWord) {
            findUserByCredentials(userName, passWord, res);
        }if (userName) {
            findUserByUsername(userName, res);
        }
        else {
            res.send(users);
        }
      function findUserByCredentials(username, password, res) {
          for (var i in users) {
              if (users[i].username === username && users[i].password === password) {
                  res.send(users[i]) ;
              }
          }
          res.send({});
      }

        function findUserByUsername(username, res) {
            for (var i in users) {
                if (users[i].username === username) {
                    res.send(users[i]) ;
                }
            }
            res.send({});
        }


    };

    app.get("/api/user/:userId", findUserById);
    function findUserById(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                res.send(users[i]);
            }
        }
        res.send({});
    }

};