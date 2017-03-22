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
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function(user){
            if (user) {
                console.log(user);
                $location.url('/user/' + user._id);
            } else {
                vm.error = 'user not found';
            }});
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
            console.log(userId);
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user});
        }

        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if (user != null) {
                        $location.url('/user/' + userId);
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
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
                UserService
                    .createUser(user)
                    .success(function (registerUser) {
                        if (registerUser != null) {
                            $location.url('/user/' + registerUser._id);
                        } else {
                            vm.error = 'unable to redirect to user profile';
                        }
                });
            }
            else {
                vm.error = 'passwords do not match';
            }
        }
    }
})();
