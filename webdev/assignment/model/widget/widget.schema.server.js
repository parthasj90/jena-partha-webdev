module.exports = function (model) {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'page'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated:Date,
        order: Number
    }, {collection: 'widget'});

    widgetSchema.post('remove', function(next) {
        var pageModel = model.pageModel.getModel();
        var widget = this;
        pageModel.findById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });

    return widgetSchema;
};