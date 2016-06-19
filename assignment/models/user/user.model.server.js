/**
 * Created by liangmanman1 on 6/6/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser:createUser,
        deleteUser:deleteUser,
        updateUser:updateUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findUserByFacebookId: findUserByFacebookId

    };
    return api;
    
    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function createUser(user) {
        var newUser = {
            username: user.username,
            password: user.password
        };
        return User.create(newUser);
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set :
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
            });
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserById(userId) {
        return User.findOne({_id: userId});
    }


};