(function () {
    angular
        .module("GoPlaces")
        .controller("LoginController", LoginController)

    function LoginController($location,UserService) {
        var vm = this;
        vm.venueId=$location.search().venueId;
        vm.login = login;

        function login (username,password) {
            if(username === "" || username == null){
                vm.error = "Username cannot be blank !"
            } else if (password === "" || password == null){
                vm.error = "Password cannot be blank !"
            } else {
                UserService
                    .login(username,password)
                    .then(function (response) {
                        var user = response.data;
                        if(user){
                            if(vm.venueId){
                                $location.url("/venue/"+vm.venueId);
                            } else {
                                $location.url("/user");
                            }
                        } else {
                            vm.error = "Invalid Credentials";
                        }
                    },
                    function (error) {
                        vm.error = "Invalid Credentials"
                    });
            }
        }
        
    }
})();