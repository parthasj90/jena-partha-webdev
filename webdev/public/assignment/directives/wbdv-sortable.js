(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                start: function( event, ui ) {},
                stop: function( event, ui ) {},
                axis: 'y'
            });
            element.on( "sortstop", function( event, ui ) {
                console.log(ui);
                $http.put("/page/:pageId/widget?initial=index1&final=index2");
            } );
            element.on( "sortstart", function( event, ui ) {console.log(ui);} );
        }
        return {
            link: linkFunc
        };

    }
})();