var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, models) {

    var userModelProject = models.userModelProject;

    app.post("/api/project/user", createUser);
    app.post("/api/project/login", passport.authenticate('goplaces'), goplacesLogin);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedIn', loggedIn);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.put("/api/project/addFavorite", addFavorite);
    app.put("/api/project/removeFavorite", removeFavorite);
    app.delete("/api/project/user/:userId", deleteUser);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/project/#/user',
        failureRedirect: '/project/#/login'
    }));
    app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    app.put("/api/project/addFriend", addFriend);
    app.put("/api/project/removeFriend", removeFriend);
    app.put("/api/project/addToFriendRequest", addToFriendRequest);
    app.put("/api/project/removeFromFriendRequest", removeFromFriendRequest);
    app.put("/api/project/addNote", addNote);
    app.put("/api/project/deleteNote", deleteNote);
    app.get("/api/project/admin/users" , getAllUsers);
    app.put("/api/project/deleteImage/:userId", deleteImage);

    function deleteImage(req, res) {
        var userId = req.params.userId;
        var url = "images/defaultDisplayPic.jpg";
        userModelProject
            .uploadImage(userId, url)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/project/uploads", upload.single('myImgFile'), uploadImage);

    function uploadImage(req, res) {

        var userId = req.body.userId;

        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var url = "/uploads/"+filename;

        userModelProject
            .uploadImage(userId, url)
            .then(
                function (stats) {
                    res
                        .redirect("/project/#/user/edit");
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    
    function getAllUsers(req, res) {
        userModelProject
            .getUsers()
            .then(
                function (users) {
                    res.send(users);
                },
                function (error) {
                    res.send([]);
                }
            );
    }
    
    function addNote(req, res) {
        var userId= req.body.userId;
        var note = req.body.note;
        userModelProject
            .addNote(userId, note)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteNote(req, res) {
        var userId= req.body.userId;
        var note = req.body.note;
        userModelProject
            .deleteNote(userId, note)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }


    function addFriend(req, res) {
        var userId = req.body.userId;
        var friendId = req.body.friendId;
        userModelProject
            .addFriend(userId, friendId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function removeFriend(req, res) {
        var userId = req.body.userId;
        var friendId = req.body.friendId;
        userModelProject
            .removeFriend(userId, friendId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function addToFriendRequest(req, res) {
        var userId = req.body.userId;
        var friendId = req.body.friendId;
        userModelProject
            .addToFriendRequest(userId, friendId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function removeFromFriendRequest(req, res) {
        var userId = req.body.userId;
        var friendId = req.body.friendId;
        userModelProject
            .removeFromFriendRequest(userId, friendId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }
    
    
    
    function addFavorite(req, res) {
        var userId = req.body.userId;
        var venue = req.body.venue;
        userModelProject
            .addToFavorites(userId, venue)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function removeFavorite(req, res) {
        var userId = req.body.userId;
        var venueId = req.body.venueId;
        userModelProject
            .removeFromFavorites(userId, venueId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }


    passport.use('goplaces', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModelProject
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password))  {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModelProject
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function goplacesLogin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModelProject
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModelProject
                            .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    var googleConfig = {
        clientID     : "957745628940-ml758ubvnaoeru6ber1m814m8csh9bjj.apps.googleusercontent.com",
        clientSecret : "hc00D_Oevr0fd4t0HBKnTsdr",
        callbackURL  : "http://localhost:3000/auth/google/callback"
    };

/*
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
*/

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));


    function googleStrategy(token, refreshToken, profile, done) {
        userModelProject
            .findUserByGoogleId(profile.id)
            .then(
                function(googleUser) {
                    if(googleUser) {
                        done(null,googleUser);
                    } else{
                        var email = profile.emails[0].value;
                        console.log(email);
                        var emailParts = email.split("@");
                        googleUser={
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        userModelProject.createUser(googleUser)
                            .then(function(user){
                                done(null,user);
                            })
                    }
                });
    }

    var facebookConfig = {
        clientID     : "156098021584108",
        clientSecret : "d73e040307bcee4ea559a64b790a94be",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };

/*
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
*/


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {

        userModelProject
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModelProject
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            return done(err, null);
                        });
                }
            }, function (err) {
                return done(err, null);
            });
    }
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModelProject
            .deleteUser(userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModelProject
            .updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModelProject
            .createUser(user)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModelProject
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }

    function getUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(null);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModelProject
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModelProject
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

};