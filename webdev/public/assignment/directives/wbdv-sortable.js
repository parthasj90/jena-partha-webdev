(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y'
            });
            element.on( "sortstop", function( event, ui ) {

                var order1 = element.sortable('toArray');
                $http.put("/page/:pageId/widget?initial="+order1+"&final="+order1);
            } );
        }
        return {
            link: linkFunc
        };

    }
})();