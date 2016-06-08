/**
 * Created by liangmanman1 on 6/4/16.
 */
module.exports = function (app, models) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;
        if(myFile == null) {
            res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+ "/" + pageId+"/widget/"+widgetId);
            return;
        }
        else {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                }
            }
            res.redirect("/assignment/index.html#/user/" + userId +"/website/" + websiteId +"/"+ pageId+ "/widget/" + widgetId);
        }


    }


    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "123", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    function createWidget(req, res) {
        var newWidget = req.body;
        widgets.push(newWidget);
        res.json(newWidget);
    }

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var newWidgets = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                newWidgets.push(widgets[i]);
            }
        }
        res.send(newWidgets);
    }

    app.get("/api/widget/:widgetId", findWidgetById);
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(404).send("Widget with ID: " + widgetId + " not found");
    }

    // need revise
    app.put("/api/widget/:widgetId", updateWidget);
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                if (widgets[i].widgetType === "HEADER") {
                    widgets[i].text = newWidget.text;
                    widgets[i].size = newWidget.size;
                    res.send(200);
                    return;
                }
                else if ((widgets[i].widgetType === "IMAGE") || (widgets[i].widgetType === "YOUTUBE")) {
                    widgets[i].width = newWidget.width;
                    widgets[i].url = newWidget.url;
                    res.send(200);
                    return;
                }
                else if (widgets[i].widgetType === "HTML") {
                    widgets[i].text = newWidget.text;
                    res.send(200);
                    return;
                }
                else {
                    res.status(400).send("Widget with Type: " + newWidget.widgetType + " not designed yet");
                }
            }
        }
        res.status(400).send("Widget with ID: " + widgetId + " not found");
    }

    app.delete("/api/widget/:widgetId", deleteWidget);
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove widget with ID: " + widgetId);
    }

};