module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server')();

    var websiteModel = mongoose.model('website', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPage: addPage
    };
    return api;

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
                //website.remove();
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
                website.pages.push(websiteId);
                website.save();
                deferred.resolve(website);
            });
        return deferred.promise;

    }

};