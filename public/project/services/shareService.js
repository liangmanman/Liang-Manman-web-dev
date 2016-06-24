/**
 * Created by liangmanman1 on 6/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("ShareService", ShareService);

    function ShareService($http) {
        var api = {
            findSharesByUser:findSharesByUser,
            findShareById: findShareById,
            createShare: createShare,
            updateShare: updateShare,
            deleteShare: deleteShare

        };
        return api;

        function createShare(userId, name) {
            var url = "/api/user/"+ userId +"/Share";
            var Share = {
                name: name,
                developerId: userId
            };
            return $http.post(url, Share);
        }

        function updateShare(ShareId, Share) {
            var url = "/api/Share/" + ShareId;
            return $http.put(url, Share);
        }

        function deleteShare(ShareId) {
            var url = "/api/Share/" + ShareId;
            return $http.delete(url)
        }

        function findSharesByUser(userId) {
            var url = "/api/user/"+ userId +"/Share";
            return $http.get(url);
        }

        function findShareById(ShareId) {
            var url = "/api/Share/" + ShareId;
            return $http.get(url);
        }
    }


})();