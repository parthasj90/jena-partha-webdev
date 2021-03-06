module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema;
    var model = {};
    var pageModel;

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidget: addWidget,
        setModel: setModel,
        getModel: getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        pageSchema = require('./page.schema.server')(model);
        pageModel = mongoose.model('page', pageSchema);

    }

    function getModel() {
        return pageModel;
    }

    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel.findByIdAndUpdate(pageId, page, function (err, page) {
            deferred.resolve(page);
        });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.findByIdAndRemove(pageId, function (err, page) {
            if (err) {
                deferred.abort(err);
            } else {
                page.remove();
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, page) {
                deferred.resolve(page);
            });
        return deferred.promise;

    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel
            .find({_website: websiteId}, function (err, pages) {
                deferred.resolve(pages);
            });
        return deferred.promise;
    }


    function createPage(websiteId, page) {
        var deferred = q.defer();
        page._website = websiteId;
        pageModel.create(page, function (err, page) {
            if (err) {
                deferred.abort();
            } else {
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function addWidget(pageId, widgetId) {
        var deferred = q.defer();
        pageModel
            .findById(pageId, function (err, page) {
                page.widgets.push(widgetId);
                page.save();
                deferred.resolve(page);
            });
        return deferred.promise;

    }
};