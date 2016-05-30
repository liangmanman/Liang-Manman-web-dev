/**
 * Created by liangmanman1 on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            { "_id": "123", "name": "Post 1", "websiteId": "456" },
            { "_id": "234", "name": "Post 2", "websiteId": "456" },
            { "_id": "345", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            pagesSize: pagesSize
        };
        return api;
        
        function createPage(websiteId, page) {
            pages.push(page);
            return true;
        }
        
        function findPageByWebsiteId(websiteId) {
            var result = [];
            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }
        
        function findPageById(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return false;
        }
        function updatePage(pageId, page) {
            for (var i in pages) {
                if (pages[i]===pageId) {
                    pages[i].name = page.name;
                }
            }
        }
        
        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId){
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        
        function pagesSize() {
            return pages.length;
        }
        
    }

})();