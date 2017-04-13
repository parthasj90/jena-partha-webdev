module.exports = function () {

    var mongoose = require("mongoose");

    var VenueSchemaProject = mongoose.Schema({
        venueId: String,
        venueName: String,
        owners: [{type: mongoose.Schema.ObjectId, ref: "ProjectUser"}],
        comments: [{
            value: String,
            commentedOn: {type: Date, default: Date.now()},
            commentedBy: {type: mongoose.Schema.ObjectId, ref: "ProjectUser"}
        }],
        venueAddress: String,
        venueContactNumber: String,
        displayPicture: String,
        photos: [String],
        favoriteOf: [{type: mongoose.Schema.ObjectId, ref: "ProjectUser"}],
        rating: {
            ratedBy: {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
            value: String
        }
    }, {collection: "project.venue"});

    return VenueSchemaProject;
};