/**
 * Created by liangmanman1 on 6/4/16.
 */
module.exports = function (app, models) {

    var pageModel = models.pageModel;

    // var pages = [
    //     { "_id": "123", "name": "Post 1", "websiteId": "456" },
    //     { "_id": "234", "name": "Post 2", "websiteId": "456" },
    //     { "_id": "345", "name": "Post 3", "websiteId": "456" }
    // ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    
    
    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(newPage);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.send(pages);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                res.status(400).send(error);
            })
    }
    
    
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(pageId, newPage)
            .then(function (page) {
                res.send(page);
            }, function (error) {
                res.status(400).send(error);
            })

    }
    
    
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.status(404).send(error);
            });

    }
};