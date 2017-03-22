module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server')();

    var widgetModel = mongoose.model('widget', widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget:reorderWidget
    };
    return api;

    function updateWidget(widgetId,widget) {
        var deferred = q.defer();
        widgetModel.findByIdAndUpdate(widgetId,widget,function (err,website) {
            deferred.resolve(widget);
        });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.findByIdAndRemove(widgetId, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
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
        var deferred = q.defer();
        widgetModel
            .find({_page:pageId}, function (err, widgets) {
                deferred.resolve(widgets);
            });
        return deferred.promise;
    }



    function createWidget(pageId,widget) {
        var deferred = q.defer();
        widget._page = pageId;
        console.log(widget,pageId);
        widgetModel.create(widget, function (err, widget) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(widget);
            }
        });
        return deferred.promise;
    }

    function reorderWidget(pageId,start,end) {
        var deferred = q.defer();
        widgetModel
            .findById(pageId, function (err, page) {
                page.widgets.push(widgetId);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;

    }
};