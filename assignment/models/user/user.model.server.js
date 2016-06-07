/**
 * Created by liangmanman1 on 6/6/16.
 */
model.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mogoose.model("User", UserSchema);
    
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
    
    function deleteUser() {
        
    }
    
    function updateUser() {
        
    }
    
    function findUserByCredentials() {
        
    }
    
    function findUserByUsername() {
        
    }
    
    function findUserById(userId) {
        return User.findById(userId);
    }
    
    
};