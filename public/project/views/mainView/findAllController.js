/**
 * Created by liangmanman1 on 6/25/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("findAllController", findAllController)
        .controller("shareInformationController", shareInformationController);
    
    function shareInformationController($routeParams, $location, AllService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.shareType = $routeParams.type;
        vm.shareId = $routeParams.shareId;
        vm.sharerId =  $routeParams.sharerId;
        function init() {
            AllService.findLikeById(vm.shareId, vm.shareType)
                .then(function (response) {
                    console.log(response.data);
                    vm.like = response.data;
                });
            AllService.findSharedUser(vm.sharerId)
                .then(function (response) {
                    vm.sharedUser = response.data;
                });
            if (vm.shareType =="album") {
                AllService.findMusicForAlbum(vm.shareId)
                    .then(function (response) {
                        vm.musics = response.data;
                    });
            }
        }
        init();
    }

    function findAllController($routeParams, $location, AllService) {
        var vm = this;
        vm.goBack = goBack;
        vm.addLike = addLike;
        vm.goToProfile = goToProfile;
        vm.getInformation = getInformation;
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
        
        function getInformation(Type, shareId, sharerId) {
            if (vm.userId == undefined) {
                vm.error = "can't look at information without Account; Please login first";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else {
                if (Type =="music") {
                    $location.url("/user/" + vm.userId + "/findAll/music/" + shareId + "/" + sharerId + "/information");
                }
                else {
                    $location.url("/user/" + vm.userId + "/findAll/album/" + shareId + "/" + sharerId + "/information");
                }
            }
        }

        function goBack() {
            if (vm.userId == undefined) {
                $location.url("/login");
            }
            else {
                $location.url("/profile/" + vm.userId);
            }
        }

        function addLike(shareId, shareType, shareName) {
            if (vm.userId == undefined) {
                vm.error = "can't addLike without Account; Please login first";
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
                            $("#hideError").fadeIn(500).delay(1000).fadeOut(500);

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