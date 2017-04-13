module.exports = function (app, models) {

    var venueModelProject = models.venueModelProject;


    app.post("/api/project/venue", createVenue);
    app.get("/api/project/venue/:venueId", findVenueById);
    app.put("/api/project/venue/:venueId", updateVenue);
    app.put("/api/project/venue/:venueId/addComment", addComment);
    app.put("/api/project/venue/:venueId/deleteComment", deleteComment);
    app.put("/api/project/venue/:venueId/addFavorite", addFavoriteOf);
    app.put("/api/project/venue/:venueId/removeFavorite", removeFavoriteOf);
    app.get("/api/project/venue/:venueId/isFavoriteOf/:userId", isFavoriteOf);
    app.get("/api/project/admin/venues", getAllVenue);
    app.delete("/api/project/venue/:venueId", deleteVenue);

    function getAllVenue(req, res) {
        venueModelProject
            .getAllVenue()
            .then(
                function (venues) {
                    res.send(venues);
                },
                function (error) {
                    res.send(null);
                }
            )
    }

    function deleteVenue(req,res) {
        var venueId = req.params.venueId;
        venueModelProject
            .deleteVenue(venueId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function isFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.params.userId;
        venueModelProject
            .isFavoriteOf(venueId,userId)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            );
    }

    function addFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.body.userId;
        var venue = {
            venueId: venueId,
            favoriteOf: [userId]
        };
        venueModelProject
            .findVenueByVenueId(venueId)
            .then(
                function (venueCheck) {
                    if(venueCheck){
                        venueModelProject
                            .addFavoriteOf(venueId,userId)
                            .then(
                                function (stats) {
                                    res.send(stats);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    } else {
                        venueModelProject
                            .createVenue(venue)
                            .then(
                                function (response) {
                                    res.send(response);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    }
                }
            );


    }

    function removeFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.body.userId;
        venueModelProject
            .removeFavoriteOf(venueId,userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteComment(req, res) {
        var venueId =req.params.venueId;
        var comment = req.body;
        venueModelProject
            .deleteComment(venueId,comment)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function addComment(req, res) {
        var venueId =req.params.venueId;
        var comment = req.body;
        var venue = {
            venueId: venueId,
            comments: [comment]
        }
        venueModelProject
            .findVenueByVenueId(venueId)
            .then(
                function (venueCheck) {
                    if(venueCheck){
                        venueModelProject
                            .addComment(venueId,comment)
                            .then(
                                function (stats) {
                                    res.send(stats);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    } else {
                        venueModelProject
                            .createVenue(venue)
                            .then(
                                function (response) {
                                    res.send(response);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    }
                }
            );
    }

    function createVenue(req, res){
        var venue = req.body;
        venueModelProject
            .createVenue(venue)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findVenueById(req, res) {
        var venueId = req.params.venueId;
        venueModelProject
            .findVenueByVenueId(venueId)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }


    function updateVenue(req, res) {
        var venueId =req.params.venueId;
        var venue = req.body;
        venueModelProject
            .findVenueByVenueId(venueId)
            .then(
                function (venueCheck) {
                    if(venueCheck){
                        venueModelProject
                            .updateVenue(venueId, venue)
                            .then(
                                function (stats) {
                                    res.send(stats);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    } else {
                        venueModelProject
                            .createVenue(venue)
                            .then(
                                function (response) {
                                    res.send(response);
                                },
                                function (error) {
                                    res.send(error);
                                }
                            );
                    }
                }
            );
    }

};