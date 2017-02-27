(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "567", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
            // for (var p in pages) {
            //     if (pages[p]._id == pageId) {
            //         return angular.copy(pages[p]);
            //     }
            // }
            // return null;
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
            // for (var p in pages) {
            //     if (pages[p]._id == pageId) {
            //         pages.splice(p, 1);
            //     }
            // }
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page);
            // page.websiteId = websiteId;
            // page._id = (new Date()).getTime();
            // pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
            // var page = [];
            // for (var p in pages) {
            //     if (pages[p].websiteId == websiteId) {
            //         page.push(pages[p]);
            //     }
            // }
            // return page;
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/"+pageId,page);
            // for (var p in pages) {
            //     if (pages[p]._id == pageId) {
            //         pages[p].name = page.name;
            //         pages[p].description = page.description;
            //         return pages[p];
            //     }
            // }
            // return null;
        }
    }
})();