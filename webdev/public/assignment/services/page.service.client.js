(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findWebsiteById(wid) {
            for(var w in websites) {
                if(websites[w]._id == wid) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id == websiteId) {
                    websites.splice(w, 1);
                }
            }
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId == userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id == websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return null;
        }
    }
})();