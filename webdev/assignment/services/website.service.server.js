module.exports = function (app,model) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website",createWebsite);

    var userModel = model.userModel;
    var websiteModel = model.websiteModel;

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.send(websites);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsite(req, res) {
        var wId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(wId,website)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWebsite(req, res) {
        var wId = req.params.websiteId;
        websiteModel
            .deleteWebsite(wId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .createWebsiteForUser(userId,website)
            .then(function (website) {
                userModel
                    .addWebsite(userId,website._id)
                    .then(function (user) {
                        res.send(website);
                    })
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsiteById(req, res) {
        var wId = req.params.websiteId;
        websiteModel
            .findWebsiteById(wId)
            .then(function (website) {
                res.send(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};