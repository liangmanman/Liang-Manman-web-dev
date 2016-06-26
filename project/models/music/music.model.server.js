/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var MusicSchema = require("./music.schema.server.js")();
    var Music = mongoose.model("Music", MusicSchema);

    var api = {
        createMusicForUser:createMusicForUser,
        findMusicById: findMusicById,
        findAllMusicsForUser: findAllMusicsForUser,
        findAllLikeMusicForUser: findAllLikeMusicForUser,
        findAllMusic: findAllMusic,
        findMusicForAlbum: findMusicForAlbum,
        updateMusic: updateMusic,
        addFollowerToMusic: addFollowerToMusic,
        addMusicToAlbum:  addMusicToAlbum,
        deleteMusicFromAlbum: deleteMusicFromAlbum,
        deleteMusic: deleteMusic,
        deleteLike:  deleteLike

    };
    return api;

    function createMusicForUser(userId, music) {
        music._user = userId;
        return Music.create(music);

    }

    function findAllMusicsForUser(userId) {
        return Music.find({_user: userId}); // use find for find list
    }

    function findAllLikeMusicForUser(userId) {
        return Music.find({followers: userId})
    }

    function findAllMusic() {
        return Music.find({});
    }

    function findMusicById(musicId) {
        return Music.findOne({_id: musicId});
    }

    function findMusicForAlbum(albumId) {
        return Music.find({belongsTo: albumId});
    }

    function updateMusic(MusicId, music) {
        return Music.update(
            {_id: MusicId},
            {$set :
            {
                name: music.name,
                description: music.description,
                url: music.url
            }
            });
    }

    function addFollowerToMusic(userId, musicId) {
        return Music.update(
            {_id: musicId},
            { $addToSet: { followers: userId}}
        );
    }
    
    function addMusicToAlbum(musicId, albumId) {
        return Music.update(
            {_id: musicId},
            {$addToSet: { belongsTo: albumId}}
        );
    }

    function deleteMusicFromAlbum(musicId, albumId) {
        console.log("into modelService");
        return Music.update(
            {_id: musicId},
            {$pull: { belongsTo: albumId}}
        );
    }

    function deleteMusic(MusicId) {
        return Music.remove({_id: MusicId});
    }

    function deleteLike(musicId, userId) {
        return Music.findOneAndUpdate(
            {_id: musicId},
            {$pull: {followers: userId}
            }
        );
    }


};