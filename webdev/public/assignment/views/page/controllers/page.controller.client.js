(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

        }

        init();

    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        // event handlers
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(pageId)
                .success(function (page) {
                    vm.page = page;
                });

        }

        init();
        function updatePage(newPage) {
            PageService
                .updatePage(pageId, newPage)
                .success(function (page) {
                    if (page != null) {
                        $location.url('/user/' + userId + "/website/" + websiteId + "/page");
                    } else {
                        vm.error = "Unable to update website";
                    }
                });

        }

        function deletePage() {
            PageService
                .deletePage(pageId)
                .success(function () {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page");
                });

        }
    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;
        // event handlers
        vm.createPage = createPage;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();
        function createPage(newPage) {
            PageService
                .createPage(websiteId, newPage)
                .success(function () {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page");
                });


        }
    }
})();

