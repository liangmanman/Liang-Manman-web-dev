/**
 * Created by liangmanman1 on 6/3/16.
 */
module.exports = function (app, models) {

    var websiteModel =  models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    
    
    
    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        
    }
    
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(400).send(error);
            });

    }

    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.sned(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }
};