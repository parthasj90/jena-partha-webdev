(function () {
    angular
        .module("GoPlaces")
        .controller("AdminController", AdminController);

    function AdminController($location, SearchService, $route, VenueService, UserService) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.deleteVenue = deleteVenue;
        vm.adminLogin = adminLogin;
        vm.register = register;
        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(
                    function (response) {
                        vm.success = "Updated successfully";
                        $route.reload();
                    },
                    function (error) {
                        vm.error = "Unable to update user"
                    }
                );
        }

        function register(user) {
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            vm.success = "Registered successfully";
                            $route.reload();
                        }
                    },
                    function (err) {
                        vm.error = err.data;
                    }
                );

        }

        function init() {
            UserService
                .getUsers()
                .then(
                    function (response) {
                        if (response.data) {
                            vm.users = response.data;
                        } else {
                            vm.users = [];
                        }
                    },
                    function (error) {
                        vm.users = [];
                    }
                )

            VenueService
                .getAllVenue()
                .then(
                    function (response) {
                        if (response.data) {
                            vm.ven = response.data;
                            vm.venues = [];
                            for (var i in vm.ven) {
                                getVenueDetails(vm.ven[i].venueId);
                            }
                        } else {
                            vm.venues = [];
                        }
                    },
                    function (error) {
                        vm.venues = [];
                    }
                )
        }

        init();

        function adminLogin(adminUsername, adminPassword) {
            if (adminUsername === "admin" && adminPassword === "admin") {
                $location.url("/admin/login");
            } else {
                vm.error = "Invalid Credentials";
            }
        }

        function getVenueDetails(venueId) {
            SearchService
                .findPlaceById(venueId)
                .then(
                    function (response) {
                        var venueDetails = response.data.response.venue;
                        vm.venues.push(venueDetails);
                    }
                )
        }


        function deleteUser(user) {
            var confirmation = confirm("Are you sure to delete this user ?");
            if (confirmation) {
                UserService
                    .deleteUser(user._id)
                    .then(
                        function (res) {
                            $route.reload();
                            vm.deleteUserStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            vm.deleteUserStatus = false;
                        }
                    );
            }
        }


        function deleteVenue(venueId) {
            var confirmation = confirm("Are you sure to delete this venue ?");
            if (confirmation) {
                VenueService
                    .deleteVenue(venueId)
                    .then(
                        function (res) {
                            $route.reload();
                            vm.deleteVenueStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            vm.deleteVenueStatus = false;
                        }
                    );
            }
        }


    }

})();