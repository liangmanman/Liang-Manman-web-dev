/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function (app, models) {

    var musicModel =  models.musicModel;

    app.post("/api/user/:userId/music", createMusic);
    app.get("/api/user/:userId/music", findAllMusicsForUser);
    app.get("/api/user/:userId/musicLike", findAllLikeMusicForUser);
    app.get("/api/allMusic", findAllMusic);
    app.get("/api/music/:musicId", findMusicById);
    app.get("/api/music/:likeId/:userId", findReview);
    app.put("/api/music/:musicId", updateMusic);
    app.put("/api/music/:shareId/:userId", addLike);
    app.delete("/api/music/:musicId", deleteMusic);
    app.delete("/api/music/:musicId/:userId", deleteLike);



    function createMusic(req, res) {
        var newMusic = req.body;
        var userId = req.params.userId;
        musicModel
            .createMusicForUser(userId, newMusic)
            .then(
                function (Music) {
                    res.json(Music);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }


    function findAllMusicsForUser(req, res) {
        var userId = req.params.userId;
        musicModel
            .findAllMusicsForUser(userId)
            .then(function (Musics) {
                res.json(Musics);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllLikeMusicForUser(req, res) {
        var userId = req.params.userId;
        musicModel
            .findAllLikeMusicForUser(userId)
            .then(function (Musics) {
                res.json(Musics);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    function findAllMusic(req, res) {
        musicModel
            .findAllMusic()
            .then(function (Musics) {
                res.json(Musics);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    

    

    function findMusicById(req, res) {
        var musicId = req.params.musicId;
        musicModel
            .findMusicById(musicId)
            .then(function (Music) {
                res.json(Music);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function findReview(req, res) {
        var musicId = req.params.likeId;
        var userId = req.params.userId;
        musicModel
            .findReview(musicId, userId)
            .then(function (review) {
                res.json(review);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function updateMusic(req, res) {
        var musicId = req.params.musicId;
        var newMusic = req.body;
        musicModel
            .updateMusic(musicId, newMusic)
            .then(function (music) {
                res.json(music);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function addLike(req, res) {
        var shareId = req.params.shareId;
        var userId = req.params.userId;
        musicModel.
            addFollowerToMusic(userId, shareId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function deleteMusic(req, res) {
        var musicId = req.params.musicId;
        musicModel
            .deleteMusic(musicId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function deleteLike(req, res) {
        var musicId = req.params.musicId;
        var userId = req.params.userId;
        musicModel
            .deleteLike(musicId, userId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }
};