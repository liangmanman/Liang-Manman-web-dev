/**
 * Created by liangmanman1 on 6/3/16.
 */
module.exports = function (app, models) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        res.json(newWebsite);
    }
    
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var newWebsites = [];
        for (var i in websites) {
            if (websites[i].developerId === userId) {
                newWebsites.push(websites[i]);
            }
        }
        res.send(newWebsites);
        // res.json(newWebsites);
    }
    app.get("/api/website/:websiteId", findWebsiteById);
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send({});
    }

    app.put("/api/website/:websiteId", updateWebsite);
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = newWebsite.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: "+ websiteId +" not found");

    }

    app.delete("/api/website/:websiteId", deleteWebsite);
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + websiteId);
    }
};