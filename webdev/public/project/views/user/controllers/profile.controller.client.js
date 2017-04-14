(function () {
    angular
        .module("GoPlaces")
        .controller("ProfileController", ProfileController)

    function ProfileController($route, $rootScope, UserService, $location) {
        var vm = this;
        var id = $rootScope.currentUser._id;

        vm.addNote = addNote;
        vm.deleteNote =deleteNote;
        vm.deleteImage =deleteImage;
        vm.requestAccept = requestAccept;
        vm.requestDeny = requestDeny;
        vm.updateUser = updateUser;
        vm.unregister = unregisterUser;
        vm.logout = logout;
        vm.findFriend = findFriend;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;

                    vm.fRequests =[];
                    for (var i in vm.user.friendRequest){
                        fetchUserDetails(vm.user.friendRequest[i]);
                    }
                    vm.frnds = [];
                    for (var i in vm.user.friends){
                        fetchFriendsDetails(vm.user.friends[i]);
                    }
                    vm.nts= [];
                    for(var i in vm.user.notes){
                        fetchNoteDetails(vm.user.notes[i]);
                    }

                });
        }
        init();

        function deleteNote(note) {
            UserService
                .deleteNote(id, note)
                .then(
                    function (response) {
                        vm.deleteNoteStatus = true;
                        $route.reload();
                    },
                    function (error) {
                        $route.reload();
                    }
                )
        }

        function deleteImage() {
            vm.imgDeleteError= null;
            if(vm.user.displayPicture == "images/defaultDisplayPic.jpg"){
                vm.imgDeleteError = "Cannot delete the default image";
            } else {
                UserService
                    .deleteImage(vm.user._id)
                    .then(
                        function (response) {
                            vm.deleteImagestatus = true;
                            $route.reload();
                        },
                        function (error){
                            vm.imgDeleteError = "Unable to delete the image";
                            $route.reload();
                        })
            }
        }

        function addNote(noteValue) {
            var note = {
                value: noteValue,
                createdOn: Date.now(),
                writtenBy: id
            }
            UserService
                .addNote(id, note)
                .then(
                    function (response) {
                        vm.addNoteStatus = true;
                        $route.reload();
                    }, function (error) {
                        $route.reload();
                    }
                )
        }

        function fetchNoteDetails(note) {
            UserService
                .findUserById(note.writtenBy)
                .then(
                    function(response){
                        note.writerDetails =response.data;
                        vm.nts.push(note);
                    }
                );
        }


        function fetchUserDetails(usrId) {
            UserService
                .findUserById(usrId)
                .then(
                    function(response){
                        vm.fRequests.push(response.data);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        function fetchFriendsDetails(usrId) {
            UserService
                .findUserById(usrId)
                .then(
                    function(response){
                        vm.frnds.push(response.data);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }


        function requestAccept(friendId) {
            UserService
                .removeFromFriendRequest(id, friendId)
                .then(
                    function (response) {
                        UserService
                            .addFriend(id,friendId)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }



        function requestDeny(friendId) {
            UserService
                .removeFromFriendRequest(id, friendId)
                .then(
                    function (response) {
                        UserService
                            .removeFriend(friendId, id)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }


        vm.searchPlaces = function (searchString,searchLocation) {
            if(searchString == null || searchString.trim === "" || searchString == undefined
                || searchLocation == null || searchLocation.trim === "" || searchLocation == undefined){
                vm.error = "Please enter a valid location and a search query"
            } else {
                $location.url("/searchResult/"+searchString+"/"+searchLocation);
            }
        };



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
            var confirmation = confirm("Are you sure to delete your account ?");
            if(confirmation){
                UserService
                    .deleteUser(id)
                    .then(
                        function(response){
                            $location.url("/main");
                            $rootScope.currentUser = null
                        },
                        function(error) {
                            vm.error = "Unable to remove user"
                            $rootScope.currentUser = null
                        }
                    );
            }
        }

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function (response) {
                        vm.success = "Updated successfully";
                        $location.url("/user");
                    },
                    function (error) {
                        vm.error = "Unable to update user"
                    }
                );
        }



        function findFriend(friendName) {
            UserService
                .findUserByUsername(friendName)
                .then(
                    function (response) {
                        vm.friendSearch = response.data;
                    },
                    function (error) {
                        vm.friendSearch = null;
                    }
                )
        }
    }
})();