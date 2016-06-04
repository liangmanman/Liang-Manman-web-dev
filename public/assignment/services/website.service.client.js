/**
 * Created by liangmanman1 on 5/28/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);



    function WebsiteService($http) {

        var api = {
            findWebsitesByUser:findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        function createWebsite(userId, name) {
            var url = "/api/user/"+ userId +"/website";
            var website = {
                name: name,
                developerId: userId
            };
            return $http.post(url, website);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }
        
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+ userId +"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            $http.get(url);
        }
    }


})();