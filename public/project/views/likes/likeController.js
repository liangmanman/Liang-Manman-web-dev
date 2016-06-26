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
        vm.updatelike = updatelike;
        vm.deletelike = deletelike;
        vm.userId = $routeParams.userId;
        vm.likeType = $routeParams.type;
        vm.likeId = $routeParams.likeId;

        function init() {
            LikeService.findLikeById(vm.likeId, vm.likeType)
                .then(function (response) {
                    vm.like = response.data;
                });
            LikeService.findReview(vm.likeId, vm.likeType, vm.userId)
                .then(function (response) {
                    vm.review = response.data;
                })
        }
        init();

        function updatelike() {
            if (vm.like.name === undefined) {
                vm.error = "music name should be something";
            }
            else {
                LikeService.updatelike(vm.likeId, vm.like)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/likes");
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }
        }
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