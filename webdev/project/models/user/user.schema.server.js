module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchemaProject = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        notes: [{
            value: String,
            writtenBy: {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
            createdOn: {type: Date, default: Date.now()}
        }],
        facebook:{
            id:String,
            token:String
        },
        google:{
            id:String,
            token:String
        },
        favorites: [{
            venueId: {type: mongoose.Schema.ObjectId, ref: "Venue"},
            venueImage: String,
            venueName: String
        }],
        bucketList: [{
            venueId: {type: mongoose.Schema.ObjectId, ref: "Venue"},
            venueImage: String,
            venueName: String
        }],
        photos:[String],
        phone: String,
        friends: [{type: mongoose.Schema.ObjectId, ref: "ProjectUser"}],
        friendRequest: [{type: mongoose.Schema.ObjectId, ref: "ProjectUser"}],
        displayPicture: {type: String, default: "images/defaultDisplayPic.jpg"},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});

    return UserSchemaProject;
};