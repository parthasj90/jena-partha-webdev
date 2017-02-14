(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var websites = WebsiteService.findWebsitesByUser(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
    }
})();
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, WebsiteService,$location) {
        var vm = this;

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        var website = WebsiteService.findWebsiteById(websiteId);
        vm.website = website;
        function updateWebsite(newWebsite) {
            var site = WebsiteService.updateWebsite(websiteId, newWebsite);
            if(site != null) {
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
    (function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, WebsiteService,$location) {
        var vm = this;

        // event handlers
        vm.createWebsite = createWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;
        var website = WebsiteService.findWebsiteById(websiteId);
        vm.website = website;
        function createWebsite(newWebsite) {
            WebsiteService.createWebsite(userId,newWebsite);
            $location.url('/user/' + userId + "/website");

        }
    }
    })();

