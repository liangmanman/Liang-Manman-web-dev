/**
 * Created by liangmanman1 on 6/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("shareListController", shareListController)
        .controller("shareNewController", shareNewController)
        .controller("shareEditController", shareEditController);

    function shareNewController($routeParams, $location, ShareService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;

        function createShare(name) {
            if (name === undefined) {
                vm.error = "Can't add without name";
            }
            else {
                ShareService.createShare(vm.userId, name)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/shares");
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }

        }
    }

    function shareEditController($routeParams, $location, ShareService) {
        var vm = this;
        vm.updateShare = updateShare;
        vm.deleteShare = deleteShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;

        function init() {
            ShareService.findShareById(vm.shareId)
                .then(function (response) {
                    vm.share = response.data;
                });
        }
        init();

        function deleteShare() {
            ShareService.deleteShare(vm.shareId);
            $location.url("/user/" + vm.userId + "/shares");
        }

        function updateShare() {
            if (vm.share.name === undefined) {
                vm.error = "share name should be something";
            }
            else {
                ShareService.updateShare(vm.shareId, vm.share)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/shares");
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }
        }
    }


    function shareListController($routeParams, ShareService) {
        var vm = this;
        function init() {
            vm.userId = $routeParams.userId;
            ShareService.findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.shares = response.data;
                });
        }
        init();
    }


})();