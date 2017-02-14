(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@yo.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  , email: "Bob@yo.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  , email: "charly@yo.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , email: "Jose@yo.com"}
        ];
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime();
            users.push(user);
            return user;
        }
        
        function deleteUser(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users.splice(u,1);
                }
        }}

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                   // users[u].username = newUser.username;
                    users[u].email = newUser.email;
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();