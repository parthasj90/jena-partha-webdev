module.exports = function (app,model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user",createUser);

   /* var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];*/

    var userModel = model.userModel;

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId,newUser)
            .then(function (user) {

                console.log(user);
                res.send(user[0]);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        userModel
            .deleteUser(req.params.userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

   /* function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.json(user);
    }*/
     function createUser(req, res) {
         userModel
             .createUser(req.body)
             .then(function (user) {
                 res.send(user);
             }, function (err) {
                 res.sendStatus(500).send(err);
             });
     }

    /*function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);
    }*/
    function findUserById(req, res) {
        userModel
            .findUserById(req.params.userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        userModel
            .findUserByUsername(req.query.username)
            .then(function (user) {
                res.send(user[0]);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                res.send(user[0]);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}