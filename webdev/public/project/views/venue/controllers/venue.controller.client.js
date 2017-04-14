(function() {
    angular
        .module("GoPlaces")
        .controller("VenueController", VenueController);

    function VenueController($location, SearchService, $route, $rootScope, VenueService, UserService, $routeParams) {
        var vm = this;
        vm.venueId = $routeParams.venueId;
        vm.user = $rootScope.currentUser;

        vm.removeFavorite = removeFavorite;
        vm.addFavorite = addFavorite;
        vm.addComment = addComment;
        vm.deleteComment = deleteComment;
        vm.unregister = unregisterUser;
        vm.logout = logout;
        vm.getUserDetails = getUserDetails;

        function init() {
            SearchService
                .findPlaceById(vm.venueId)
                .then(
                    function (response) {
                        vm.venueDetails = response.data.response.venue;
                        parseVenueDetails();
                        VenueService
                            .findVenueById(vm.venueId)
                            .then(
                                function (response) {
                                    var venue = response.data;
                                    if(venue && vm.user){
                                        if(venue.favoriteOf.indexOf(vm.user._id)> -1){
                                            vm.isFavorite = true;
                                            vm.isNotFavorite = false;
                                        } else {
                                            vm.isFavorite = false;
                                            vm.isNotFavorite = true;
                                        }
                                    } else {
                                        vm.isFavorite = false;
                                        vm.isNotFavorite = true;
                                    }
                                    vm.cmters=[];
                                    if(venue){
                                        for (var i in venue.comments){
                                            var cmt = venue.comments[i];
                                            fetchUserDetails(cmt);
                                        }
                                    }
                                },
                                function (error) {
                                    vm.cmters=[];
                                }
                            );
                    }
                );
        }

        function fetchUserDetails(cmt) {
            UserService
                .findUserById(cmt.commentedBy)
                .then(
                    function(response){
                        var updatedComment = {
                            _id : cmt._id,
                            commentedOn: cmt.commentedOn,
                            commentedUser: response.data,
                            value: cmt.value
                        };
                        vm.cmters.push(updatedComment);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        init();


        function parseVenueDetails() {
            vm.photosURL=[];
            for(var i in vm.venueDetails.photos.groups){
                for(var j in vm.venueDetails.photos.groups[i].items){
                    var imageURL= vm.venueDetails.photos.groups[i].items[j].prefix+"original"+vm.venueDetails.photos.groups[i].items[j].suffix;
                    imageURL = imageURL.replace(/\//gi,"/");
                    vm.photosURL.push(imageURL);
                }
            }
            if(vm.photosURL.length === 0){
                vm.photosURL.push("https://www.drphillipscenter.org/resources/images/default.jpg");
            }
            vm.imgURL = "https://www.drphillipscenter.org/resources/images/default.jpg";
            if(vm.venueDetails.bestPhoto != undefined){
                vm.imgURL = vm.venueDetails.bestPhoto.prefix+"original"+vm.venueDetails.bestPhoto.suffix;
                vm.imgURL = vm.imgURL.replace(/\//gi,"/");
            }
            vm.addrs = "";
            var addressArray = vm.venueDetails.location.formattedAddress;
            for (var a in addressArray) {
                vm.addrs = vm.addrs+addressArray[a]+", ";
            }
            vm.addrs= vm.addrs.replace(/, $/, "");
            vm.phone= "NA";
            if(vm.venueDetails.contact.formattedPhone != null || vm.venueDetails.contact.formattedPhone != undefined ){
                vm.phone = vm.venueDetails.contact.formattedPhone;
            }
            vm.rating = "NA";
            if(vm.venueDetails.rating != null || vm.venueDetails.rating != undefined ){
                vm.rating = vm.venueDetails.rating;
            }
        }

        


        function removeFavorite() {
            UserService
                .removeFavorite($rootScope.currentUser._id,vm.venueId)
                .then(
                    function (response) {
                        return  VenueService
                                    .removeFavoriteOf(vm.venueId, $rootScope.currentUser._id);
                    },
                    function (error) {
                        vm.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    }
                )
                .then(
                    function (response) {
                        vm.removeFavoriteStatus = true;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    },
                    function (error) {
                        vm.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    }
                );
        }




        function addFavorite() {
            if($rootScope.currentUser){
                var venue = {
                    venueId: vm.venueId,
                    venueImage: vm.imgURL,
                    venueName: vm.venueDetails.name,
                };
                UserService
                    .addFavorite($rootScope.currentUser._id,venue)
                    .then(
                        function (response) {
                            return  VenueService
                                .addFavoriteOf(vm.venueId, $rootScope.currentUser._id);
                        },
                        function (error) {
                            vm.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    )
                    .then(
                        function (response) {
                            vm.addFavoriteStatus = true;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        },
                        function (error) {
                            vm.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId="+vm.venueId);
            }
        }

        function addComment(commentValue) {
            if($rootScope.currentUser){
                var comment = {
                    value: commentValue,
                    commentedBy: $rootScope.currentUser._id,
                    commentedOn: Date.now()
                };
                VenueService
                    .addComment(vm.venueId,comment)
                    .then(
                        function (response) {
                            vm.addCommentStatus = true;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        },
                        function (error) {
                            vm.addCommentStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId="+vm.venueId);
            }
        }



        function deleteComment(comment) {
            VenueService
                .deleteComment(vm.venueId,comment)
                .then(
                    function (response) {
                        vm.deleteCommentStatus = true;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    },
                    function (error) {
                        vm.deleteCommentStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    }
                );
        }



        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    },
                    function() {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    }
                );

        }

        function unregisterUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(
                    function(response){
                        $location.url("/main");
                        $rootScope.currentUser = null;
                    },
                    function(error) {
                        vm.error = "Unable to remove user";
                        $rootScope.currentUser = null
                    }
                );
        }


        function getUserDetails(commentedById) {
            UserService
                .findUserById(commentedById)
                .then(
                    function(response){
                        vm.commentedByUser = response.data;
                    },
                    function (error) {
                        vm.commentedByUser = null;
                    }
                );
        }


    }

})();