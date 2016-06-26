/**
 * Created by liangmanman1 on 6/24/16.
 */
module.exports = function (app, models) {

    var musicModel =  models.musicModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadMusic);
    
    app.post("/api/user/:userId/music", createMusic);
    app.get("/api/user/:userId/music", findAllMusicsForUser);
    app.get("/api/user/:userId/musicLike", findAllLikeMusicForUser);
    app.get("/api/user/:albumId/findMusicForAlbum", findMusicForAlbum);
    app.get("/api/allMusic", findAllMusic);
    app.get("/api/music/:musicId", findMusicById);
    app.put("/api/music/:musicId", updateMusic);
    app.put("/api/music/:shareId/:userId", addLike);
    app.put("/api/music/:musicId/:albumId/addMusicToAlbum", addMusicToAlbum);
    app.put("/api/music/:musicId/:albumId/deleteMusicFromAlbum", deleteMusicFromAlbum);
    
    app.delete("/api/music/:musicId", deleteMusic);
    app.delete("/api/music/:musicId/:userId", deleteLike);
    
    function addMusicToAlbum(req, res) {
        var musicId = req.params.musicId;
        var albumId = req.params.albumId;
        musicModel
            .addMusicToAlbum(musicId, albumId)
            .then (function (status) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function deleteMusicFromAlbum(req, res) {
        var musicId = req.params.musicId;
        var albumId = req.params.albumId;
        musicModel
            .deleteMusicFromAlbum(musicId, albumId)
            .then (function (status) {
                res.send(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function findMusicForAlbum(req, res) {
        var albumId = req.params.albumId;
        musicModel
            .findMusicForAlbum(albumId)
            .then(function (musics) {
                res.json(musics);
            },
            function (error) {
                res.status(400).send(error);
            });
        
    }

    function uploadMusic(req, res) {
        var myFile = req.file;
        var musicId = req.body.musicId;
        var name = req.body.name;
        var description = req.body.description;
        var userId = req.body.userId;
        var type = req.body.type;
        var shareId = req.body.shareId;
        if(myFile == null) {
            console.log("ERROR: NO FILE");
        }
        else {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            var newMusic = {
                url:   "/uploads/" + filename,
                name: name,
                description: description
            };
            musicModel
                .updateMusic(musicId, newMusic)
                .then(function (music) {
                    // res.json(music);
                    res.redirect("/project/beginning.html#/user/" + userId
                        +"/shares/" + type +"/"+ shareId + "/edit");

                }, function (error) {
                    res.status(400).send(error);
                });

        }
    }



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