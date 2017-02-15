(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        // vm.deleteUser = deleteUsers;

        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }

        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if (user != null) {
                $location.url('/user/' + user._id);
            } else {
                vm.error = "Unable to update user";
            }
        }
    }
})();