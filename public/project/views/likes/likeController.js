/**
 * Created by liangmanman1 on 6/24/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("likesListController", likesListController)
        .controller("likeInformationController", likeInformationController);

    function likeInformationController($routeParams, $location, LikeService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.likeType = $routeParams.type;
        vm.likeId = $routeParams.likeId;
        vm.sharerId = $routeParams.sharerId;
        console.log(vm.sharerId);

        function init() {
            LikeService.findLikeById(vm.likeId, vm.likeType)
                .then(function (response) {
                    vm.like = response.data;
                });
            LikeService.findSharedUser(vm.sharerId)
                .then(function (response) {
                    vm.sharedUser = response.data;
                });
            if (vm.likeType =="album") {
                LikeService.findMusicForAlbum(vm.likeId)
                    .then(function (response) {
                        vm.musics = response.data;
                    });
            }

        }
        init();



    }


    function likesListController($routeParams, LikeService) {
        var vm = this;
        vm.deleteLike = deleteLike;
        function init() {
            vm.userId = $routeParams.userId;
            LikeService.findLikeMusicByUser(vm.userId)
                .then(function (response) {
                    vm.likeMusics = response.data;
                });
            LikeService.findLikeAlbumByUser(vm.userId)
                .then(function (response) {
                    vm.likeAlbums = response.data;
                });

        }
        init();

        function deleteLike(likeId, likeType) {
            LikeService.deleteLike(likeId, likeType, vm.userId)
                .then(function (response) {
                    vm.success = "Successfully delete the like";
                    init();
                },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }


})();