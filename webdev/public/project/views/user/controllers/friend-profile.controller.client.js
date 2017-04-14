(function () {
    angular
        .module("GoPlaces")
        .controller("FriendProfileController", FriendProfileController)

    function FriendProfileController($routeParams, $route, $rootScope, UserService, $location) {

        var vm = this;
        var currUser = $rootScope.currentUser;
        var friendId = $routeParams.friendId;
        vm.xplrUsr = $rootScope.currentUser;
        vm.requestAccept = requestAccept;
        vm.requestDeny = requestDeny;
        vm.addfriend = addfriend;
        vm.cancelRequest = cancelRequest;
        vm.unfriend = unfriend;
        vm.unregister = unregisterUser;
        vm.logout = logout;
        vm.deleteNote = deleteNote;
        vm.addNote = addNote;
        vm.findFriend = findFriend;

        function init() {
            UserService
                .findUserById(friendId)
                .then(function (response) {
                    vm.user = response.data;
                    if (currUser) {
                        UserService
                            .findUserById(currUser._id)
                            .then(
                                function (response) {
                                    var refreshedUser = response.data;
                                    if (refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) > -1) && (vm.user.friends.indexOf(currUser._id) > -1)) {
                                        vm.isFriends = true;
                                    }
                                    if (refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) > -1) && (vm.user.friends.indexOf(currUser._id) === -1)) {
                                        vm.requestSent = true;
                                    }
                                    if (refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) === -1) && (vm.user.friends.indexOf(currUser._id) === -1)) {
                                        vm.notFriends = true;
                                    }
                                    if (refreshedUser &&
                                        (refreshedUser.friends.indexOf(vm.user._id) === -1) &&
                                        (vm.user.friends.indexOf(currUser._id) > -1) &&
                                        (refreshedUser.friendRequest.indexOf(vm.user._id) > -1)) {
                                        vm.accptFrend = true;
                                    }
                                }
                            );
                    } else {
                        vm.isFriends = false;
                        vm.requestSent = false;
                        vm.notFriends = false;
                        vm.accptFrend = false;
                    }
                    vm.fRequests = [];
                    for (var i in vm.user.friendRequest) {
                        fetchUserDetails(vm.user.friendRequest[i]);
                    }
                    vm.frnds = [];
                    for (var i in vm.user.friends) {
                        fetchFriendsDetails(vm.user.friends[i]);
                    }
                    vm.nts = [];
                    for (var i in vm.user.notes) {
                        fetchNoteDetails(vm.user.notes[i]);
                    }
                });
        }

        init();

        function requestAccept() {
            UserService
                .removeFromFriendRequest(currUser._id, friendId)
                .then(
                    function (response) {
                        UserService
                            .addFriend(currUser._id, friendId)
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


        function requestDeny() {
            UserService
                .removeFromFriendRequest(currUser._id, friendId)
                .then(
                    function (response) {
                        UserService
                            .removeFriend(friendId, currUser._id)
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

        function fetchNoteDetails(note) {
            UserService
                .findUserById(note.writtenBy)
                .then(
                    function (response) {
                        note.writerDetails = response.data;
                        vm.nts.push(note);
                    }
                );
        }

        function fetchUserDetails(usrId) {
            UserService
                .findUserById(usrId)
                .then(
                    function (response) {
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
                    function (response) {
                        vm.frnds.push(response.data);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        function addfriend() {
            UserService
                .addFriend(currUser._id, friendId)
                .then(
                    function (response) {
                        UserService
                            .addToFriendRequest(friendId, currUser._id)
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
                )
        }


        function cancelRequest() {
            UserService
                .removeFromFriendRequest(friendId, currUser._id)
                .then(
                    function (response) {
                        UserService
                            .removeFriend(currUser._id, friendId)
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


        function unfriend() {
            UserService
                .removeFriend(friendId, currUser._id)
                .then(
                    function (response) {
                        UserService
                            .removeFriend(currUser._id, friendId)
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


        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    },
                    function () {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    }
                );

        }

        function unregisterUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/main");
                        $rootScope.currentUser = null
                    },
                    function (error) {
                        vm.error = "Unable to remove user"
                        $rootScope.currentUser = null
                    }
                );
        }


        function deleteNote(note) {
            UserService
                .deleteNote(friendId, note)
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


        function addNote(noteValue) {
            var note = {
                value: noteValue,
                createdOn: Date.now(),
                writtenBy: currUser
            }
            UserService
                .addNote(friendId, note)
                .then(
                    function (response) {
                        vm.addNoteStatus = true;
                        $route.reload();
                    }, function (error) {
                        $route.reload();
                    }
                )
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