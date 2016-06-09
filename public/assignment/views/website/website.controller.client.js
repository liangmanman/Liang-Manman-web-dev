/**
 * Created by liangmanman1 on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    
    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        
        function createWebsite(name) {
            if (name === undefined) {
                vm.error = "Can't add without name";
            }
            else {
                WebsiteService.createWebsite(vm.userId, name)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }

        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }

        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function updateWebsite() {
            if (vm.website.name === undefined) {
                vm.error = "website name should be something";
            }
            else {
                WebsiteService.updateWebsite(vm.websiteId, vm.website)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }
        }
    }


        function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            function init() {
                vm.userId = $routeParams.userId;
                WebsiteService.findWebsitesByUser(vm.userId)
                    .then(function (response) {
                        vm.websites = response.data;
                    });
            };
            init();
        }


})();