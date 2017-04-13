(function () {
    angular
        .module("GoPlaces")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;
        
        vm.register = register;
        
        function register(user) {
            if(user.password !== user.passwordConfirmation) {
                vm.error = "Password did not match";
            } else {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                $location.url("/user");
                            }
                        },
                        function (err) {
                            vm.error = err.data;
                        }
                    );
            }
        }
        
    }
})();