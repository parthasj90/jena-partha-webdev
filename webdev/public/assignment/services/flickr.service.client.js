(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "b5e15073f876a2f79a14f3d4cfda00c9";
    var secret = "376d848fd48c36e2";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();