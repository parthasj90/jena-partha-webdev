module.exports = function (model) {
    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'page'}],
        dateCreated: Date
    }, {collection: 'website'});

    websiteSchema.post('remove', function (next) {
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var userModel = model.userModel.getModel();
        var website = this;
        userModel.findById(website._user)
            .then(function (user) {
                var index = user.websites.indexOf(website._id);
                if (index > -1) {
                    user.websites.splice(index, 1);
                    user.save();
                }
            });
        widgetModel.remove({_page: {$in: website.pages}}).exec();
        pageModel.remove({_id: {$in: website.pages}}).exec();
    });

    return websiteSchema;
};