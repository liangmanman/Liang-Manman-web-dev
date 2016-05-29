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
                var ith =  UserService.userSize() + 1;
                var ith2 = ith + 1;
                var ith3 = ith2 + 1;
                var newId = ith.toString() + ith2.toString() + ith3.toString();
                var user = {
                    _id: newId,
                    username: username,
                    password: password,
                    firstName: "",
                    lastName: ""
                };
                var createdUser = UserService.createUser(user);
                if (createdUser) {
                    var id = user._id;
                    $location.url("/user/" + id);
                }else {
                    vm.error = "Can't register; please check your username and password";
                }
            }

        }

    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams["userId"];
        var index = -1;
        var user = null;
        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            }
            else {
                vm.error = "User not found";
            }
        }
    }

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login (username, password) {
            var user = UserService.findUserByCredentials(username, password);

            if (user) {
                var id = user._id;
                $location.url("/user/" + id);
            }else {
                vm.error = "User not found";
            }
        }
    }
})();