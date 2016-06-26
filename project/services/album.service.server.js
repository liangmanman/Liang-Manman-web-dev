/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function (app, models) {

    var albumModel =  models.albumModel;

    app.post("/api/user/:userId/album", createAlbum);
    app.get("/api/user/:userId/album", findAllAlbumsForUser);
    app.get("/api/user/:userId/albumLike", findAllLikeAlbumsForUser);
    app.get("/api/allAlbum", findAllAlbum);
    app.get("/api/album/:albumId", findAlbumById);
    app.get("/api/album/:likeId/:userId", findReview);
    app.put("/api/album/:albumId", updateAlbum);
    app.put("/api/album/:shareId/:userId", addLike);
    app.delete("/api/album/:albumId", deleteAlbum);
    app.delete("/api/album/:albumId/:userId", deleteLike);
    
    function createAlbum(req, res) {
        var newAlbum = req.body;
        var userId = req.params.userId;
        albumModel
            .createAlbumForUser(userId, newAlbum)
            .then(
                function (album) {
                    res.json(album);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }
    
    function findAllAlbumsForUser(req, res) {
        var userId = req.params.userId;
        albumModel
            .findAllAlbumsForUser(userId)
            .then(function (albums) {
                res.json(albums);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllLikeAlbumsForUser(req, res) {
        var userId = req.params.userId;
        albumModel
            .findAllLikeAlbumsForUser(userId)
            .then(function (albums) {
                res.json(albums);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllAlbum(req, res) {
        albumModel
            .findAllAlbum()
            .then(function (Albums) {
                res.json(Albums);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAlbumById(req, res) {
        var albumId = req.params.albumId;
        albumModel
            .findAlbumById(albumId)
            .then(function (album) {
                res.json(album);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findReview(req, res) {
        var musicId = req.params.likeId;
        var userId = req.params.userId;
        albumModel
            .findReview(musicId, userId)
            .then(function (review) {
                res.json(review);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function updateAlbum(req, res) {
        var albumId = req.params.albumId;
        var newAlbum = req.body;
        albumModel
            .updateAlbum(albumId, newAlbum)
            .then(function (album) {
                res.json(album);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function addLike(req, res) {
        var shareId = req.params.shareId;
        var userId = req.params.userId;
        albumModel.
            addFollowerToAlbum(userId, shareId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function deleteAlbum(req, res) {
        var albumId = req.params.albumId;
        albumModel
            .deleteAlbum(albumId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    
    function deleteLike(req, res) {
        var albumId = req.params.albumId;
        var userId = req.params.userId;
        albumModel
            .deleteLike(albumId, userId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }
};