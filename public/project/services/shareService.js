/**
 * Created by liangmanman1 on 6/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("ShareService", ShareService);

    function ShareService($http) {
        var api = {
            findShareMusicByUser: findShareMusicByUser,
            findShareAlbumByUser: findShareAlbumByUser,
            findShareById: findShareById,
            findMusicForAlbum: findMusicForAlbum,
            createShare: createShare,
            updateShare: updateShare,
            addMusicToAlbum: addMusicToAlbum,
            deleteMusicFromAlbum: deleteMusicFromAlbum,
            deleteShare: deleteShare

        };
        return api;
        
        function findMusicForAlbum(albumId) {
            return $http.get("/api/user/"+albumId+"/findMusicForAlbum");
        }

        function createShare(userId, name, type, description) {
            if (type == "music") {
                var url = "/api/user/"+ userId +"/music";
            }
            else {
                var url = "/api/user/"+ userId +"/album";
            }
            var share = {
                name: name,
                type: type,
                description: description
            };
            return $http.post(url, share);
        }

        function updateShare(shareId, share) {
            if (share.type == "music") {
                var url = "/api/music/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.put(url, share);
        }
        
        function addMusicToAlbum(musicId, albumId) {
            var url = "/api/music/" + musicId + "/" + albumId + "/addMusicToAlbum";
            return $http.put(url);
        }
        
        function deleteMusicFromAlbum(musicId, albumId) {
            var url = "/api/music/" + musicId + "/" + albumId + "/deleteMusicFromAlbum";
            return $http.put(url);
        }

        function deleteShare(shareId, shareType) {
            if (shareType == "music") {
                var url = "/api/music/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.delete(url)
        }

        function findShareMusicByUser(userId) {
            var url = "/api/user/"+ userId +"/music";
            return $http.get(url);
        }

        function findShareAlbumByUser(userId) {
            var url = "/api/user/"+ userId +"/album";
            return $http.get(url);
        }

        

        function findShareById(shareId, shareType) {
            if (shareType == "music") {
                var url = "/api/music/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.get(url);
        }
    }


})();