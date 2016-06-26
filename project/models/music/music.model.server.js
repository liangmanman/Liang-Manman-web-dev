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
        findReview: findReview,
        updateMusic: updateMusic,
        addFollowerToMusic: addFollowerToMusic,
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

    function findReview(musicId, userId) {
        var music = Music.findOne({_id: musicId});
        var reviews = music.reviews;
        console.log(reviews);
        var review = reviews.findOne({reviewBy: userId});
        return review.comment;
    }

    function updateMusic(MusicId, music) {
        return Music.update(
            {_id: MusicId},
            {$set :
            {
                name: music.name,
                description: music.description
            }
            });
    }

    function addFollowerToMusic(userId, musicId) {
        return Music.update(
            {_id: musicId},
            { $addToSet: { followers: userId}}
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