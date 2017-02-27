(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                update: function(){
                    var order1 = element.sortable('toArray');
                    console.log(order1);
                    $http.put("/page/:pageId/widget?initial="+order1+"&final="+order1);
            },
                axis: 'y'
            });
            element.on( "sortstop", function( event, ui ) {

                var order1 = element.sortable('toArray');
                console.log(order1);
                $http.put("/page/:pageId/widget?initial="+order1+"&final="+order1);
            } );
            element.on( "sortstart", function( event, ui ) {console.log(ui);} );
        }
        return {
            link: linkFunc
        };

    }
})();