/**
 * Created by liangmanman1 on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username === undefined) {
                vm.error = "Can't register; please check your username";
            }
            else if  (password !== verifyPassword) {
                vm.error = "Can't register; please make sure password and verifyPassword are the same";
            }
            else if (password === undefined) {
                vm.error = "Can't register; please make sure your password is valid";
            }
            else {
                UserService.createUser(username, password)
                    .then(function (response) {
                            $location.url("/user/" + username);
                        },
                        function (error) {
                            vm.error = error.data;
                        })

            }

        }

    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var id = $routeParams["userId"];
        var index = -1;
        function init() {
            UserService.findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.user._id, vm.user)
                .then(
                    function(response) {
                    vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    })
        }

                function unregister() {
                       UserService
                            .deleteUser(id)
                            .then(function(response) {
                                            $location.url("/login");
                                        },
                                function(error) {
                                    vm.error = error.data;
                                });
                    }
    }

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login (username, password) {
            UserService.findUserByCredentials(username, password)
                .then(function (response) {
                    console.log(response);
                    var user = response.data;
                    if (user) {
                        var id = user._id;
                        $location.url("/user/" + id);
                    }else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();