/**
 * Created by liangmanman1 on 6/25/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("LikeService", LikeService);

    function LikeService($http) {
        var api = {
            findLikeMusicByUser: findLikeMusicByUser,
            findLikeAlbumByUser: findLikeAlbumByUser,
            findLikeById: findLikeById,
            createLike: createLike,
            updateLike: updateLike,
            deleteLike: deleteLike

        };
        return api;

        function createLike(userId, name, type, description) {
            if (type == "music") {
                var url = "/api/user/"+ userId +"/music";
            }
            else {
                var url = "/api/user/"+ userId +"/album";
            }
            var Like = {
                name: name,
                type: type,
                description: description
            };
            return $http.post(url, Like);
        }

        function updateLike(LikeId, Like) {
            if (Like.type == "music") {
                var url = "/api/music/" + LikeId;
            }
            else {
                var url = "/api/album/" + LikeId;
            }
            return $http.put(url, Like);
        }

        function deleteLike(LikeId, shareType, userId) {
            if (shareType == "music") {
                var url = "/api/music/" + LikeId + "/" + userId;
            }
            else {
                var url = "/api/album/" + LikeId + "/" + userId;
            }
            return $http.delete(url)
        }

        function findLikeMusicByUser(userId) {
            var url = "/api/user/"+ userId +"/musicLike";
            return $http.get(url);
        }

        function findLikeAlbumByUser(userId) {
            var url = "/api/user/"+ userId +"/albumLike";
            return $http.get(url);
        }
        
        function findLikeById(LikeId, LikeType) {
            if (LikeType == "music") {
                var url = "/api/music/" + LikeId;
            }
            else {
                var url = "/api/album/" + LikeId;
            }
            return $http.get(url);
        }
    }


})();