/**
 * Created by liangmanman1 on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser:createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };
    return api;
    
    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website); 

    }
    
    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId}); // use find for find list 
    }
    
    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId});
    }
    
    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {$set :
            {
                name: website.name,
                description: website.description
            }
            });
    }
    
    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
    
    
};
