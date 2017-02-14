(function(){
angular
    .module("WebAppMaker")
    .controller("registerController", registerController);

function registerController(UserService, $location) {
    var vm = this;
    vm.register = register;

    function register(user) {
        console.log(user);
        if(user.password == user.password2) {
            var registerUser = UserService.createUser(user);
            console.log(registerUser);
            if (registerUser != null) {
                $location.url('/user/' + registerUser._id);
            } else {
                vm.error = 'unable to redirect to user profile';
            }
        }
        else
        {
            vm.error = 'passwords do not match';
        }
    }
}
})();
