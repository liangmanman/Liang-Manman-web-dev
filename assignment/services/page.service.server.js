/**
 * Created by liangmanman1 on 6/4/16.
 */
module.exports = function (app) {

    var pages = [
        { "_id": "123", "name": "Post 1", "websiteId": "456" },
        { "_id": "234", "name": "Post 2", "websiteId": "456" },
        { "_id": "345", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    function createPage(req, res) {
        var newPage = req.body;
        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        res.json(newPage);
    }
    
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newPages = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                newPages.push(pages[i]);
            }
        }
        res.send(newPages);
    }
    
    app.get("/api/page/:pageId", findPageById);
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }
    
    app.put("/api/page/:pageId", updatePage);
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: "+ pageId +" not found");

    }
    
    app.delete("/api/page/:pageId", deletePage);
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove page with ID: " + pageId);
    }
};