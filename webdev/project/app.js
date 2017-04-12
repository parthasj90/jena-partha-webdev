module.exports = function (app) {
    var model = require("./model/models.server")();
    require("./services/user.service.server")(app, model);

}