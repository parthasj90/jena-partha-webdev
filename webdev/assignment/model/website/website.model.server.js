module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema;
    var model = {};
    var websiteModel;

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPage: addPage,
        setModel:setModel,
        getModel:getModel
    };
    return api;

    function setModel(_model) {
        model = _model;
        websiteSchema = require('./website.schema.server')(model);
        websiteModel = mongoose.model('website', websiteSchema);

    }
    function getModel() {
        return websiteModel;
    }

    function updateWebsite(websiteId,website) {
        var deferred = q.defer();
        websiteModel.findByIdAndUpdate(websiteId,website,function (err,website) {
            deferred.resolve(website);
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.findByIdAndRemove(websiteId, function (err, website) {
            if(err) {
                deferred.abort(err);
            } else {
                website.remove();
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, website) {
                deferred.resolve(website);
            });
        return deferred.promise;

    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .find({_user:userId}, function (err, websites) {
                deferred.resolve(websites);
            });
        return deferred.promise;
    }



    function createWebsiteForUser(userId,website) {
        var deferred = q.defer();
        website._user = userId;
        websiteModel.create(website, function (err, website) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function addPage(websiteId,pageId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, website) {
                website.pages.push(pageId);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;

    }

};