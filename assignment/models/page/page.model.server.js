/**
 * Created by liangmanman1 on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage

    };
    return api;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findOne({_id: pageId});
    }
    
    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {$set :
            {
                name: page.name,
                description: page.description
            }
            });
    }
    
    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};
