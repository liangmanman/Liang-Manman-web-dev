/**
 * Created by liangmanman1 on 5/28/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService() {

        var api = {
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            websitesSize: websitesSize

        };
        return api;

        function createWebsite(userId, website) {
            websites.push(website)
            return true;
        }

        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    return true;
                }
            }
            return null;
        }
        
        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                }
            }
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return websites[i];
                }

            }
            return null;
        }

        function websitesSize() {
            return websites.length;
        }


    }


})();