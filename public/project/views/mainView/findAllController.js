/**
 * Created by liangmanman1 on 6/25/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("findAllController", findAllController);

    function findAllController($routeParams, $location, AllService) {
        var vm = this;
        vm.addLike = addLike;
        vm.goToProfile = goToProfile;
        function init() {
            vm.userId = $routeParams.userId;
            AllService.findShareMusic()
                .then(function (response) {
                    vm.shareMusics = response.data;
                });
            AllService.findShareAlbum()
                .then(function (response) {
                    vm.shareAlbums = response.data;
                });

        }
        init();

        function addLike(shareId, shareType, shareName) {
            if (vm.userId == undefined) {
                vm.error = "can't addLike without Account; Please register first";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else {
                AllService.addLike(shareId, shareType, vm.userId)
                    .then(
                        function (response) {
                            vm.success = "Successfully add " + shareName + " to your Likes";
                            $("#hideSuccess").fadeIn(500).delay(1000).fadeOut(500);
                        }, 
                        function (error) {
                            vm.error = error.data;
                        }
                    )}
        };

        function goToProfile() {
            if (vm.userId == undefined) {
                $location.url("/register");
            }
            else {
                $location.url("/profile/" + vm.userId);
            }
        }
    }




})();