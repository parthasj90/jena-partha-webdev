module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema;
    var model = {};
    var userModel;

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsite: addWebsite,
        setModel:setModel,
        getModel:getModel
    };
    return api;
    function setModel(_model) {
        model = _model;
        userSchema = require("./user.schema.server")(model);
        userModel = mongoose.model('user', userSchema);

    }
    function getModel() {
        return userModel;
    }

    function updateUser(userId,user) {
        var deferred = q.defer();
        userModel.findByIdAndUpdate( userId,user,function (err,user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.findByIdAndRemove(userId, function (err, user) {
            if(err) {
                deferred.abort(err);
            } else {
                user.remove();
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                deferred.resolve(user);
            });
        return deferred.promise;
        
    }
    
    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel
            .find({username:username}, function (err, actor) {
                deferred.resolve(actor);
            });
        return deferred.promise;
    }
    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        userModel
            .find({username:username,password:password}, function (err, actor) {
                deferred.resolve(actor);
            });
        return deferred.promise;
    }
    

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function (err, user) {
            if(err) {
                deferred.abort();
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function addWebsite(userId,websiteId) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.websites.push(websiteId);
                user.save();
                deferred.resolve(user);
            });
        return deferred.promise;

    }
};