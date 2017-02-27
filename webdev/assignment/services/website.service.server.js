module.exports = function (app) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website",createWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function updateWebsite(req, res) {
        var wId = req.params.websiteId;
        var website = req.body;
        for(var w in websites) {
            if( websites[w]._id == wId ) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(website[w]);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var wId = req.params.websiteId;
        for(var w in websites) {
            if( websites[w]._id == wId ) {
                websites.splice(w, 1);
                res.json(w);
                return;
            }
        }
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website.developerId = userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.json(website);
    }

    function findWebsiteById(req, res) {
        var wId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == wId;
        });
        res.json(website);
    }
};