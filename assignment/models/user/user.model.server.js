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
        findUserById: findUserById

    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
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

    function findUserByUsername() {

    }

    function findUserById(userId) {
        return User.findById(userId);
    }


};