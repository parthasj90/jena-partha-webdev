(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        var pages = PageService.findPageByWebsiteId(websiteId);

        vm.pages = pages;

    }
})();
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService,$location) {
        // event handlers
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        var pages = PageService.findPageByWebsiteId(websiteId);

        vm.pages = pages;

        var page = PageService.findPageById(pageId);
        vm.page = page;
        function updatePage(newPage) {
            var page = PageService.updatePage(pageId, newPage);
            if(page != null) {
                $location.url('/user/' + userId + "/website/" + websiteId + "/page");
            } else {
                vm.error = "Unable to update website";
            }
        }
        function deletePage() {
            PageService.deletePage(pageId);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page");
        }
    }
})();
    (function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService,$location) {
        var vm = this;

        // event handlers
        vm.createPage = createPage;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;

        var page = PageService.findPageById(pageId);
        vm.page = page;
        function createPage(newPage) {
            PageService.createPage(websiteId,newPage);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page");

        }
    }
    })();

