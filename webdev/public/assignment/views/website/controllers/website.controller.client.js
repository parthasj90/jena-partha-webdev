(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            vm.userId = userId;
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }

        init();
        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(websiteId, newWebsite)
                .success(function (site) {
                if (site != null) {
                    $location.url('/user/' + userId + "/website");
                } else {
                    vm.error = "Unable to update website";
                }
            });

        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function () {
                $location.url('/user/' + userId + "/website");
            });

        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;

        // event handlers
        vm.createWebsite = createWebsite;

        var userId = $routeParams.uid;
        function init() {
            vm.userId = userId;
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();
        function createWebsite(newWebsite) {
            WebsiteService
                .createWebsite(userId, newWebsite)
                .success(function () {
                $location.url('/user/' + userId + "/website");
            });


        }
    }
})();

