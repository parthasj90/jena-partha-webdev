module.exports = function (app,model) {
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

    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;

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
        widgetModel
            .findAllWidgetsForPage(pId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWidget(req, res) {
        var wId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(wId,widget)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var wId = req.params.widgetId;
        widgetModel
            .deleteWidget(wId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel
            .createWidget(pageId,widget)
            .then(function (widget) {
                console.log("in create widget going to page model" ,widget);
                pageModel
                    .addWidget(pageId,widget._id)
                    .then(function (page) {
                        console.log("inside addpage",widget);
                        res.send(widget);
                    })
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var wId = req.params.widgetId;
        widgetModel
            .findWidgetById(wId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};