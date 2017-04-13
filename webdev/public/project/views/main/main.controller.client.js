(function() {
    angular
        .module("GoPlaces")
        .controller("MainController", MainController);
    
    function MainController($location,UserService, $rootScope) {
        var vm = this;
        
        vm.user = $rootScope.currentXploreUser;

        vm.unregister = unregisterUser;
        vm.logout = logout;
        vm.search = search;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function() {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    }
                );

        }

        function unregisterUser() {
            UserService
                .deleteUser(id)
                .then(
                    function(response){
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                        $rootScope.currentXploreUser = null
                    }
                );
        }

        function search(place) {
           if(place.type.trim === "" || place.location.trim === ""){
                vm.error = "Please enter a valid location and a search query"
            } else {
                $location.url("/searchResult/"+place.type+"/"+place.location);
            }
        }

    }
    
})();