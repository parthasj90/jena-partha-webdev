module.exports = function () {
    var userModel = require('./user/user.model.server')();
    var pageModel = require('./page/page.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var widgetModel = require('./widget/widget.model.server')();
    var model = {
        userModel: userModel,
        pageModel: pageModel,
        websiteModel: websiteModel,
        widgetModel: widgetModel
    };
    return model;
};