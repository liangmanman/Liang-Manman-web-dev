/**
 * Created by liangmanman1 on 6/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("shareListController", shareListController)
        .controller("shareNewController", shareNewController)
        .controller("shareEditController", shareEditController)
        .controller("albumEditController",albumEditController)
        .controller("albumAddController", albumAddController);
    
    function albumAddController($routeParams, $location, ShareService) {
        var vm = this;
        vm.addToAlbum = addToAlbum;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;
        function init() {
            ShareService.findShareMusicByUser(vm.userId)
                .then(function (response) {
                    vm.shareMusics = response.data;
                });
        }
        init();

        function addToAlbum(shareId, shareName) {
            ShareService.addMusicToAlbum(shareId, vm.shareId)
                .then(function (response) {
                    vm.success = "Successfully add " + shareName + " to your album";
                    $("#hideSuccess").fadeIn(500).delay(1000).fadeOut(500);
                }, function (error) {
                    vm.error = error.data;
                    $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                })
        }
    }
    
    function albumEditController($routeParams, $location, ShareService) {
        var vm = this;
        vm.deleteMusicFromAlbum = deleteMusicFromAlbum;
        vm.deleteShare = deleteShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;
        function init() {
            ShareService.findMusicForAlbum(vm.shareId)
                .then(function (response) {
                    vm.musics = response.data;
                });
            ShareService.findShareById(vm.shareId, "album")
                .then(function (response) {
                    vm.album = response.data;
                });
        }
        init();

        function deleteShare() {
            ShareService.deleteShare(vm.shareId, "album")
                .then(function (response) {
                        $location.url("/user/" + vm.userId + "/shares");
                    },
                    function (error) {
                        vm.error = error.data;
                        $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                    });
        }

        function deleteMusicFromAlbum(shareId, shareName) {
            ShareService.deleteMusicFromAlbum(shareId, vm.shareId)
                .then(function (response) {
                    vm.success = "Successfully delete " + shareName + " from your album";
                    $("#hideSuccess").fadeIn(500).delay(1000).fadeOut(500);
                    init();
                }, function (error) {
                    vm.error = error.data;
                    $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                })
        }
    }

    function shareNewController($routeParams, $location, ShareService) {
        var vm = this;
        vm.createShare = createShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;

        function createShare(name, type, description) {
            if (name === undefined) {
                vm.error = "Can't add without name";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else if (type == undefined)    {
                vm.error = "Have to choose a type";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            } 
            else {
                ShareService.createShare(vm.userId, name, type, description)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/shares");
                        },
                        function (error) {
                            vm.error = error.data;
                            $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
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
            ShareService.findShareById(vm.shareId, "music")
                .then(function (response) {
                    vm.share = response.data;
                });
        }
        init();

        function deleteShare() {
            ShareService.deleteShare(vm.shareId, "music");
            $location.url("/user/" + vm.userId + "/shares");
        }

        function updateShare() {
            if (vm.share.name === undefined) {
                vm.error = "music name should be something";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else {
                ShareService.updateShare(vm.shareId, vm.share)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/shares");
                        },
                        function (error) {
                            vm.error = error.data;
                            $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
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