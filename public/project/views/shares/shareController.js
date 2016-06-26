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
        vm.createShare = createShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;

        function createShare(name, type, description) {
            if (name === undefined) {
                vm.error = "Can't add without name";
            }
            else if (type == undefined)    {
                vm.error = "Have to choose a type";
            } 
            else {
                ShareService.createShare(vm.userId, name, type, description)
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
        vm.shareType = $routeParams.type;
        vm.shareId = $routeParams.shareId;

        function init() {
            ShareService.findShareById(vm.shareId, vm.shareType)
                .then(function (response) {
                    vm.share = response.data;
                });
        }
        init();

        function deleteShare() {
            ShareService.deleteShare(vm.shareId, vm.shareType);
            $location.url("/user/" + vm.userId + "/shares");
        }

        function updateShare() {
            if (vm.share.name === undefined) {
                vm.error = "music name should be something";
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
            ShareService.findShareMusicByUser(vm.userId)
                .then(function (response) {
                    vm.shareMusics = response.data;
                });
            ShareService.findShareAlbumByUser(vm.userId)
                .then(function (response) {
                    vm.shareAlbums = response.data;
                });
            
        }
        init();
    }


})();