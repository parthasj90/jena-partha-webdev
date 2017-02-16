(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            }
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = (new Date()).getTime();
            widgets.push(widget);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var widget = [];
            for (var w in widgets) {
                if (widgets[w].pageId == pageId) {
                    widget.push(widgets[w]);
                }
            }
            return widget;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
        }
    }
})();