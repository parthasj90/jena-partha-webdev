(function() {
    angular
        .module("GoPlaces")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/main/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin-login.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/login?:venueId", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/edit", {
                templateUrl: "views/user/templates/profile-edit.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/searchResult/:searchString/:searchLocation", {
                templateUrl: "views/search/searchResult.view.client.html",
                controller: "SearchResultController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLogged
                }
            })
            .when("/venue/:venueId", {
                templateUrl: "views/venue/venue.view.client.html",
                controller: "VenueController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLogged
                }
            })
            .when("/user/friend/:friendId", {
                templateUrl: "views/user/templates/friend-profile.view.client.html",
                controller: "FriendProfileController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedFriend
                }
            })
            .when("/admin/login", {
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/main"
            });


        function checkLoggedIn($q, $location,$rootScope, UserService) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentXploreUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentXploreUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        };

        function checkLogged($q, $location,$rootScope, UserService) {

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentXploreUser = null;
                        } else {
                            $rootScope.currentXploreUser = user;
                        }
                    },
                    function (error) {
                    }
                );
            
        };

        function checkLoggedFriend($q, $location,$rootScope, $routeParams, UserService) {
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentXploreUser = null;
                        } else {
                            $rootScope.currentXploreUser = user;
                            if(user._id === $routeParams.friendId){
                                $location.url("/user");
                            }
                        }
                    },
                    function (error) {
                    }
                );

        };

    }
})();