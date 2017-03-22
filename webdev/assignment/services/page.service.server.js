module.exports = function (app,model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page",createPage);

    var websiteModel = model.websiteModel;
    var pageModel = model.pageModel;

    function findAllPagesForWebsite(req, res) {
        var wId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(wId)
            .then(function (pages) {
                res.send(pages);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pId,page)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deletePage(req, res) {
        var pId = req.params.pageId;
        pageModel
            .deletePage(pId)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId,page)
            .then(function (page) {
                websiteModel
                    .addPage(websiteId,page._id)
                    .then(function (website) {
                        res.send(page);
                    })
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pId = req.params.pageId;
        pageModel
            .findPageById(pId)
            .then(function (page) {
                res.send(page);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};