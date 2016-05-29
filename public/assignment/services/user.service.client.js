/**
 * Created by liangmanman1 on 5/26/16.
 */
(function()  {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
          createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            userSize: userSize
        };
        return api;
        
        function userSize() {
            return users.length;
        }

        function updateUser(id, newUser) {
            for(var i in users) {
                if (users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;

        }

        function createUser(user) {
            users.push(user);
            return true;
        }

        function deleteUser(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    users.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        
        function findUserByUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
        
        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }

    }
})();