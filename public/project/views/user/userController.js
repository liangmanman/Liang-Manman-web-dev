/**
 * Created by liangmanman1 on 6/22/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController)
        .controller("otherProfileController", otherProfileController)
        .controller("adminController", adminController);
    
    function adminController($location, $routeParams, $rootScope, UserService, AllService) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.deleteMusic = deleteMusic;
        vm.deleteAlbum = deleteAlbum;
        vm.userId = $routeParams.userId;
        function init() {
            UserService
                .getAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                });
            AllService
                .findShareMusic()
                .then(function (response) {
                    vm.musics = response.data;
                });
            AllService
                .findShareAlbum()
                .then(function (response) {
                    vm.albums = response.data;
                })

        }
        init();
        
        function deleteMusic(musicId) {
            AllService
                .deleteMusic(musicId)
                .then(function (response) {
                    init();
                });
        }
        
        function deleteAlbum(albumId) {
            AllService
                .deleteAlbum(albumId)
                .then(function (response) {
                    init();
                });
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    vm.success = "Successfully delete User";
                    $("#hideSuccess").fadeIn(500).delay(1000).fadeOut(500);
                    init();
                }, function (error) {
                    vm.error = error;
                    $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                })
        }
        
        
        
    }

    function otherProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.otherId = $routeParams.otherId;
        vm.type = $routeParams.type;
        vm.likeId = $routeParams.likeId;

        function init() {
            UserService.findUserById(vm.otherId)
                .then(function (response) {
                    vm.otherUser = response.data;
                })
        }
        init()
    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username === undefined) {
                vm.error = "Can't register; please check your username";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else if (password !== verifyPassword) {
                vm.error = "Can't register; please make sure password and verifyPassword are the same";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else if (password === undefined) {
                vm.error = "Can't register; please make sure your password is valid";
                $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
            }
            else {
                UserService
                    .register(username, password)
                    .then(function (response) {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile/" + response.data._id);
                        },
                        function (error) {
                            vm.error = error.data;
                            $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                        })

            }

        }

    }

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.unregister = unregister;
        var id = $routeParams["userId"];
        var index = -1;
        function init() {
            if (id != undefined) {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        vm.user = response.data;
                    });
            }
            else {
                UserService
                    .findUserById($rootScope.currentUser._id)
                    .then(function (response) {
                        vm.user = response.data;
                    });
            }

        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }

        function updateUser() {
            UserService.updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                        $("#hideSuccess").fadeIn(500).delay(1000).fadeOut(500);
                    },
                    function (error) {
                        vm.error = error.data;
                        $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                    });
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                        $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                    });
        }
    }

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        // change username, password to user
        function login(username, password) {
            UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        if (user.type != "admin") {
                            $location.url("/profile/" + user._id);
                        }
                        else {
                            $location.url("/admin/" + user._id);
                        }

                    }
                    , function (error) {
                        vm.error = error.data;
                        $("#hideError").fadeIn(500).delay(1000).fadeOut(500);
                    }
                );
        }
    }

})();