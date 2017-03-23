(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.updatePosition = updatePosition;
        vm.checkSafeHtml = checkSafeHtml;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }

        init();

        function checkSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function updatePosition(initial, final) {
            WidgetService
                .updatePosition(initial, final, pageId)
                .success(function (widgets) {
                });
        }

    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        // event handlers
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            vm.widgetId = widgetId;
            WidgetService
                .findWidgetsByPageId(pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            WidgetService
                .findWidgetById(widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }

        init();
        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(widgetId, newWidget)
                .success(function (widget) {
                    if (widget != null) {
                        $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                    } else {
                        vm.error = "Unable to update website";
                    }
                });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(widgetId)
                .success(function () {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                });

        }

    }
})();
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;

        // event handlers
        vm.createWidget = createWidget;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;
            vm.pageId = pageId;
            //vm.widgetId = widgetId;
            /* WidgetService
             .findWidgetsByPageId(pageId)
             .success(function (widgets) {
             vm.widgets = widgets;
             });*/
        }

        init();
        function createWidget(type) {
            var newWidget = {};
            newWidget.type = type;
            WidgetService
                .createWidget(pageId, newWidget)
                .success(function (w) {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + w._id);
                });
        }
    }
})();

