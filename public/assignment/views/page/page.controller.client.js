/**
 * Created by liangmanman1 on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                vm.pages = response.data;
            });
        }
        init();
    }
    
    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
        }
        init();
        
        function createPage(name) {
            if (name === undefined) {
                vm.error = "Can't add without name";
            }
            else {
                var newPage = {
                    name: name,
                    websiteId: vm.websiteId
                };
                PageService.createPage(vm.websiteId, newPage)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }
        }
    }
    
    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pageId;
            PageService.findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();

        function updatePage(name) {
            if (name === undefined) {
                vm.error = "page name should be something"
            }
            else {
                var newPage = {
                    _id: vm.pageId,
                    name: name,
                    websiteId: vm.websiteId
                };
                PageService.updatePage(vm.pageId, newPage)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId + "/page");
        }
    }

})();