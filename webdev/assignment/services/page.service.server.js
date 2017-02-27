module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page",createPage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "567", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function findAllPagesForWebsite(req, res) {
        var wId = req.params.websiteId;

        var allpages = [];
        for(var p in pages) {
            if(wId === pages[p].websiteId) {
                allpages.push(pages[p]);
            }
        }
        res.json(allpages);
    }

    function updatePage(req, res) {
        var pId = req.params.pageId;
        var page = req.body;
        for(var p in pages) {
            if( pages[p]._id == pId ) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(pages[p]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pId = req.params.pageId;
        for(var p in pages) {
            if( pages[p]._id == pId ) {
                pages.splice(p, 1);
                res.json(p);
                return;
            }
        }
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = (new Date()).getTime();
        pages.push(page);
        res.json(page);
    }

    function findPageById(req, res) {
        var pId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pId;
        });
        res.json(page);
    }
};