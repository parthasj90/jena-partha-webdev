module.exports = function () {


    var models = {
        userModelProject: require("./user/user.model.server")(),
        venueModelProject: require("./venue/venue.model.server")()
    };

    return models;
};