/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var AlbumSchema = require("./album.schema.server.js")();
    var Album = mongoose.model("Album", AlbumSchema);

    var api = {
        createAlbumForUser:createAlbumForUser,
        addFollowerToAlbum: addFollowerToAlbum, 
        findAlbumById: findAlbumById,
        findAllAlbumsForUser: findAllAlbumsForUser,
        findAllLikeAlbumsForUser: findAllLikeAlbumsForUser,
        findAllAlbum: findAllAlbum,
        updateAlbum: updateAlbum,
        deleteAlbum: deleteAlbum,
        deleteLike: deleteLike
    };
    return api;

    function createAlbumForUser(userId, album) {
        album._user = userId;
        return Album.create(album);
    }

    function addFollowerToAlbum(userId, albumId) {
        return Album.update(
            {_id: albumId},
            { $addToSet: { followers: userId}}
        );
    }

    function findAllAlbumsForUser(userId) {
        return Album.find({_user: userId}); // use find for find list
    }

    function findAllLikeAlbumsForUser(userId) {
        return Album.find({followers: userId}); // use find for find list
    }

    function findAllAlbum() {
        return Album.find({});
    }



    function findAlbumById(AlbumId) {
        return Album.findOne({_id: AlbumId});
    }

    function updateAlbum(AlbumId, album) {
        return Album.update(
            {_id: AlbumId},
            {$set :
            {
                name: album.name,
                description: album.description
            }
            });
    }

    function deleteAlbum(AlbumId) {
        return Album.remove({_id: AlbumId});
    }
    
    function deleteLike(albumId, userId) {
        var followers = Album.findOne({_id: albumId});
        return Album.findOneAndUpdate(
            {_id: albumId},
            {$pull: {followers: userId}
            }
        );
    }


};