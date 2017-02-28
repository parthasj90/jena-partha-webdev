module.exports = function (app) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/upload", upload.single('myFile'),uploadImage);
    app.put("/page/:pageId/widget",sortable);

    var ids = ["123","234","345","567","678"];
    var result = [
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
    var widgets = result;

    function sortable(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        ids = initial.split(",");
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
    }

    function findAllWidgetsForPage(req, res) {
        result = widgets;
        widgets = [];
        ids.forEach(function(key) {
            var found = false;
            result = result.filter(function(item) {
                if(!found && item._id == key) {
                    widgets.push(item);
                    found = true;
                    return false;
                } else
                    return true;
            })
        })
        result = widgets;
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
        for(var id in ids){
            if (ids[id] == wId){
                ids.splice(id,1);
                break;
            }
        }
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
        ids.push(widget._id);
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