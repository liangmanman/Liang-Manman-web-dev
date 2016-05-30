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

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
        
        function createWebsite(name) {
            if (name === undefined) {
                vm.error = "Can't add without name";
            }
            else {
                size = WebsiteService.websitesSize();
                newId = (size+1).toString() + (size+2).toString() + (size+3).toString();

                var website = {
                    _id: newId,
                    name: name,
                    developerId: vm.userId
                };

                var newWebsite = WebsiteService.createWebsite(vm.userId, website);
                if (newWebsite) {
                    $location.url("/user/" + vm.userId + "/website");
                }else {
                    vm.error = "Can't add; have no idea why";
                }
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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
        
        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if(result === true) {
                vm.success = "Website successfully updated";
                $location.url("/user/" + vm.userId + "/website");
            }
            else {
                vm.error = "Website not found";
            }
        }
    }
        function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            function init() {
                vm.userId = $routeParams.userId;
                vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            }
            init();
        }

})();