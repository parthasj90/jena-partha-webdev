module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server.js")(app, models);
    require("./services/venue.service.server")(app,models);
    //require("./services/search.service.server.js")(app);
    
};