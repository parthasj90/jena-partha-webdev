module.exports = function (model) {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'user'});

    userSchema.post('remove', function (next) {
        var websiteModel = model.websiteModel.getModel();
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var user = this;

        pageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
            if (err == null) {
                widgetModel.remove({_page: {$in: pages}}).exec();
                pageModel.remove({_id: {$in: pages}}).exec();
                websiteModel.remove({_id: {$in: user.websites}}).exec();
            }
        });

    });

    return userSchema;
};