(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        function init(){

        }
        init();
        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if (loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }
})();
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
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function init(){

        }
        init();

        function register(user) {
            if (user.password == user.password2) {
                var registerUser = UserService.createUser(user);
                if (registerUser != null) {
                    $location.url('/user/' + registerUser._id);
                } else {
                    vm.error = 'unable to redirect to user profile';
                }
            }
            else {
                vm.error = 'passwords do not match';
            }
        }
    }
})();
