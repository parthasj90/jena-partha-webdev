(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;

        function init() {
            vm.userId = userId;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
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
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
        }

        init();
        function updateWebsite(newWebsite) {
            var site = WebsiteService.updateWebsite(websiteId, newWebsite);
            if (site != null) {
                $location.url('/user/' + userId + "/website");
            } else {
                vm.error = "Unable to update website";
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url('/user/' + userId + "/website");
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
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
        }

        init();
        function createWebsite(newWebsite) {
            WebsiteService.createWebsite(userId, newWebsite);
            $location.url('/user/' + userId + "/website");

        }
    }
})();

