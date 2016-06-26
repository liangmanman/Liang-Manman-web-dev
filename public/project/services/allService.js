/**
 * Created by liangmanman1 on 6/25/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("AllService", AllService);

    function AllService($http) {
        var api = {
            findShareMusic: findShareMusic,
            findShareAlbum: findShareAlbum,
            findLikeById: findLikeById,
            findSharedUser: findSharedUser,
            findMusicForAlbum: findMusicForAlbum,
            addLike: addLike

        };
        return api;

        function findMusicForAlbum(albumId) {
            return $http.get("/api/user/"+albumId+"/findMusicForAlbum");
        }

        function findSharedUser(userId) {
            var url ="/api/user/" + userId;
            return $http.get(url);
        }

        function findLikeById(LikeId, LikeType) {
            if (LikeType == "music") {
                console.log("is music");
                var url = "/api/music/" + LikeId;
            }
            else {
                var url = "/api/album/" + LikeId;
            }
            return $http.get(url);
        }
        
        function findShareMusic() {
            var url = "/api/allMusic";
            return $http.get(url);
        }
        
        function findShareAlbum() {
            var url = "/api/allAlbum";
            return $http.get(url);
        }

        function addLike(shareId, shareType, userId) {
            if (shareType == "music") {
                var url = "/api/music/" + shareId + "/" + userId;
            }
            else {
                var url = "/api/album/" + shareId + "/" + userId;
            }
            return $http.put(url);
        }
    
    }
})();