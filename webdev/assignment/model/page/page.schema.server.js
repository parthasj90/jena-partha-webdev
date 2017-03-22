module.exports = function () {
    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'website'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'widget'}],
        dateCreated: Date
    }, {collection: 'page'});

    return pageSchema;
};