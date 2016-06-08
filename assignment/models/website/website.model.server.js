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
       var newWeb = Website.create(website);
        return Website.update()


    }
    
    function findAllWebsitesForUser(userId) {
        return Website.findWebsitesByUser(userId);
    }
    
    function findWebsiteById(websiteId) {
        return Website.findWebsiteById(websiteId);
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
