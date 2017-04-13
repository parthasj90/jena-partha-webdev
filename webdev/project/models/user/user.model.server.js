module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchemaProject = require("./user.schema.server")();

    var ProjectUser = mongoose.model("ProjectUser", UserSchemaProject);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addToBucketList: addToBucketList,
        removeFromBucketList: removeFromBucketList,
        addFriend: addFriend,
        removeFriend: removeFriend,
        addToFriendRequest: addToFriendRequest,
        removeFromFriendRequest: removeFromFriendRequest,
        addNote: addNote,
        deleteNote: deleteNote,
        getUsers: getUsers,
        uploadImage: uploadImage
    };
    return api;
    
    function uploadImage(userId, url) {
        return ProjectUser
            .update(
                {_id: userId},
                {$set: {
                    displayPicture: url
                }}
            );
    }

    function getUsers() {
        return ProjectUser.find();
    }

    function addNote(userId, note) {
        return ProjectUser.update(
            {_id: userId},
            {$push: {notes: note}}
        );
    }
    
    function deleteNote(userId, note) {
        return ProjectUser.update(
            {_id: userId},
            {$pull: {notes: note}}
        );
    }

    function addToFriendRequest(userId, friendId) {
        return ProjectUser.update(
            {_id: userId},
            {$push: {friendRequest: friendId}}
        );
    }

    function removeFromFriendRequest(userId, friendId) {
        return ProjectUser.update(
            {_id: userId},
            {$pull: {friendRequest: friendId}}
        );
    }


    function addFriend(userId, friendId) {
        return ProjectUser.update(
            {_id: userId},
            {$push: {friends: friendId}}
        );
    }

    function removeFriend(userId, friendId) {
        return ProjectUser.update(
            {_id: userId},
            {$pull: {friends: friendId}}
        );
    }    

    function addToBucketList(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$push : {bucketList: venue}}
        );
    }

    function removeFromBucketList(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$pull : {bucketList: venue}}
        );
    }
    
    function addToFavorites(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$push : {favorites: venue}}
        );
    }
    
    function removeFromFavorites(userId, venueId) {
        return ProjectUser.update(
            {_id: userId},
            {$pull : {favorites: {venueId: venueId}}}
        );
    }

    function findUserByGoogleId(googleId) {
        return ProjectUser.findOne({"google.id": googleId});
    }

    function findUserByFacebookId(facebookId) {
        return ProjectUser.findOne({"facebook.id": facebookId});
    }
    
    function createUser(user) {
        return ProjectUser.create(user);
    }

    function findUserById(userId) {
        return ProjectUser.findById(userId);
    }

    function findUserByUsername(username) {
        return ProjectUser.findOne({username: username });
    }
    
    function findUserByCredentials(username, password) {
        return ProjectUser.findOne({username: username, password: password});
    }
    
    function updateUser(userId, user) {
        delete user._id;
        return ProjectUser
            .update(
                {_id: userId},
                {$set: user}
            );
    }

    function deleteUser(userId) {
        return ProjectUser.remove({_id: userId});
    }
    
};