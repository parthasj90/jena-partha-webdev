(function() {
    angular
        .module("GoPlaces")
        .controller("SearchResultController", SearchResultController);
    
    function SearchResultController($location, SearchService, $rootScope, UserService, $routeParams) {
        var vm = this;
        vm.searchString = $routeParams.searchString;
        vm.searchLocation = $routeParams.searchLocation;
        vm.user = $rootScope.currentXploreUser;

        vm.unregister = unregisterUser;
        vm.logout = logout;

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


        function init() {
            searchPlaces(vm.searchString,vm.searchLocation);
        }
        
        init();

        vm.navigateVenue = function (venueId) {
            $location.url("/venue/"+venueId);
        }

        vm.searchPlaces = function (searchString,searchLocation) {
            if(searchString == null || searchString.trim === "" || searchString == undefined
                || searchLocation == null || searchLocation.trim === "" || searchLocation == undefined){
                vm.error = "Please enter a valid location and a search query"
            } else {
                $location.url("/searchResult/"+searchString+"/"+searchLocation);
            }
        };
        
        function searchPlaces(searchString,searchLocation) {
            if(searchString == null || searchString == undefined
                || searchLocation == null || searchLocation == undefined){
                vm.error = "Please enter a valid location and a search query"
            } else {
                SearchService
                    .getAllPlaces(searchString,searchLocation)
                    .then(
                        function (response) {
                            var groups= response.data.response.groups;
                            vm.out = fetchItems(groups);
                            vm.searchResultCount = vm.out.length;
                            vm.searchString = searchString;
                            vm.searchLocation = searchLocation;
                        },
                        function (error){
                            vm.out= [];
                            vm.searchResultCount = vm.out.length;
                            vm.searchString = searchString;
                            vm.searchLocation = searchLocation;
                        }
                    )
                    .then(
                        function () {
                            vm.setFlag = true;
                        }
                    );
            }
        }

        function fetchItems(groups){
            var resultSet = [];
            for (var i in groups){
                var groupItems = groups[i].items;
                for(var j in groupItems){
                    var addrs = "";
                    var addressArray = groupItems[j].venue.location.formattedAddress;
                    for (var a in addressArray) {
                        addrs = addrs+addressArray[a]+" ";
                    }
                    if(groupItems[j].venue.featuredPhotos != undefined){
                        var imageURL = groupItems[j].venue.featuredPhotos.items[0].prefix+"original"+groupItems[j].venue.featuredPhotos.items[0].suffix;
                        imageURL = imageURL.replace(/\//gi,"/");
                    } else var imageURL = "https://www.drphillipscenter.org/resources/images/default.jpg";

                    if(groupItems[j].venue.rating != undefined){
                        var ratng = groupItems[j].venue.rating;
                    } else var ratng = 0;

                    var obj = {
                        imageURL: imageURL,
                        venueId: groupItems[j].venue.id,
                        name: groupItems[j].venue.name,
                        rating: ratng,
                        address: addrs,
                        phone: groupItems[j].venue.contact.formattedPhone
                    }
                    resultSet.push(obj);
                }
            }
            return resultSet;
        }

    }
    
})();