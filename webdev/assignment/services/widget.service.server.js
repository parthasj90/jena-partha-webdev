module.exports = function (app) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/page/:pageId/widget",sortable);

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        console.log(req.myFile);
        console.log(req.body);
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination;

        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    var widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        }];

    function sortable(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var widgetsList = [];
        widgets = widgets.filter(function(x) {
            if(pageId === x.pageId) {
                widgetsList.push(x);
            }
            return widgets.indexOf(x) < 0
        });
        var widget  = widgetsList[initial];
        widgetsList.splice(initial, 1);
        widgetsList.splice(final,0, widget);
        widgets.push.apply(widgets, widgetsList);
        res.json(widgets);
    }


    function findAllWidgetsForPage(req, res) {
        var pId = req.params.pageId;

        var allwidgets = [];
        for(var w in widgets) {
            if(pId === widgets[w].pageId) {
                allwidgets.push(widgets[w]);
            }
        }
        res.json(allwidgets);
    }

    function updateWidget(req, res) {
        var wId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if( widgets[w]._id == wId ) {
                widgets[w] = widget;
                res.json(widgets[w]);
                return;
            }
        }
    }

    function deleteWidget(req, res) {
        var wId = req.params.widgetId;
        for(var w in widgets) {
            if( widgets[w]._id == wId ) {
                widgets.splice(w, 1);
                res.json(w);
                return;
            }
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.json(widget);
    }

    function findWidgetById(req, res) {
        var wId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == wId;
        });
        res.json(widget);
    }
};