module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema;
    var model = {};
    var widgetModel;

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        widgetSchema = require('./widget.schema.server')(model);
        widgetModel = mongoose.model("widget", widgetSchema);

    }

    function getModel() {
        return widgetModel;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
            deferred.resolve(widget);
        });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        return widgetModel.findByIdAndRemove(widgetId, function (err, widget) {
            var pageId = widget._page;
            var order = widget.order;
            widgetModel.find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (widget.order > order) {
                        widget.order = widget.order - 1;
                        widget.save();
                    }
                });
            });
            widget.remove();
        });
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId, function (err, widget) {
                deferred.resolve(widget);
            });
        return deferred.promise;

    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel
            .find({_page: pageId})
            .sort({order: 1});
    }

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widget._page = pageId;
        widgetModel
            .find({_page: pageId}, function (err, widgets) {
                widget.order = widgets.length;
                widgetModel
                    .create(widget, function (err, widget) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(widget);
                        }
                    });
            });

        return deferred.promise;
    }

    function reorderWidget(pageId, start, end) {
        return widgetModel
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order == start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.order == start) {
                            widget.order = end;
                            widget.save();
                        }

                        else if (widget.order < start && widget.order >= end) {
                            widget.order = widget.order + 1;
                            widget.save();
                        }
                    }
                });
            });
    }

};