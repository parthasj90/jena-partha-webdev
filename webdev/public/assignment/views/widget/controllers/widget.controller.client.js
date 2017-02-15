(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce,$routeParams, WidgetService) {
        var vm = this;
        vm.doYouTrustUrl = doYouTrustUrl;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

    }
})();
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService,$location) {
        // event handlers
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;

        var widget = WidgetService.findWidgetById(widgetId);
        vm.widget = widget;
        function updateWidget(newWidget) {
            var widget = WidgetService.updateWidget(widgetId, newWidget);
            console.log(widget);
            if(widget != null) {
                $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            } else {
                vm.error = "Unable to update website";
            }
        }
        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
    }
})();
    (function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService,$location) {
        var vm = this;

        // event handlers
        vm.createWidget = createWidget;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;
        vm.websiteId = websiteId;
        vm.userId = userId;
        vm.pageId = pageId;
        vm.widgetId = widgetId;
        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;

        var widget = WidgetService.findWidgetById(widgetId);
        vm.widget = widget;
        function createWidget(type) {
            var w = WidgetService.createWidget(pageId,type);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + w._id);

        }
    }
    })();

