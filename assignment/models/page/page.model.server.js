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
        
    }

    function findAllPagesForWebsite(websiteId) {

    }

    function findPageById(pageId) {
        
    }
    
    function updatePage(pageId, page) {
        
    }
    
    function deletePage(pageId) {
        
    }
};
