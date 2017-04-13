(function () {
    angular
        .module("HomePage")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: 'assets/home.html'
            })
            .when("/home", {
                templateUrl: 'assets/home.html',
            })
            .when("/about", {
                templateUrl: 'assets/about.html'
            })
            .when("/projects", {
                templateUrl: 'assets/projects.html'
            })
            .when("/work", {
                templateUrl: 'assets/work.html'
            });

    }
})();
