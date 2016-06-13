/**
 * Created by liangmanman1 on 6/12/16.
 */

(function(){
    angular
        .module("ExperimentsApp", ["myDirectives"])
        .controller("ExperimentsController", ExperimentsController);

    function ExperimentsController($http) {
        var vm = this;
        vm.sorted = sorted;

        function init() {
            $http.get("/api/todos")
                .then(function(response) {
                    vm.todos = response.data;
                });
        }
        init();

        function sorted(startIndex, endIndex) {
            console.log("ExperimentsController");
            console.log(startIndex);
            console.log(endIndex);
            $http.put("/api/todos?start="+startIndex+"&end="+endIndex);
        }
    }
})();