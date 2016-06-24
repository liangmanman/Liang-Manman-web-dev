/**
 * Created by liangmanman1 on 6/4/16.
 */
module.exports = function (app, models) {

    var widgetModel =  models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);
    
    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query["start"];
        var end = req.query["end"];
        if (start && end) {
            console.log(start + "    " + end);
            widgetModel
                .reorderWidget(start, end, pageId)
                .then(function (widgets) {
                    res.json(widgets);
                }, function (error) {
                    res.status(404).send(error);
                });
        }
        else {
            console.log("can't get start and end");
        }
        

    }


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;
        if(myFile == null) {
            res.redirect("/assignment/homepage.html#/user/"+userId+"/website/"+websiteId+ "/" + pageId+"/widget/"+widgetId);
            return;
        }
        else {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            var newWidget = {
                url:   "/uploads/" + filename,
                type: "IMAGE",
                width: "100%"
            };
            widgetModel
                .updateWidget(widgetId, newWidget)
                .then(function (widget) {
                    // res.json(widget);
                    res.redirect("/assignment/homepage.html#/user/" + userId
                        +"/website/" + websiteId +"/"+ pageId+ "/widget/" + widgetId);

                }, function (error) {
                    res.status(400).send(error);
                });

        }


    }
    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "123", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "345", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"
    //     },
    //     {"_id": "456", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"},
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": "678", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": "789", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"}
    // ];

    
    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                console.log(widget);
                res.json(widget);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (widget) {
               res.json(widget);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }

};