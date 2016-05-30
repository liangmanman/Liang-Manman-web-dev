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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
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
                size = PageService.pagesSize();
                newId = (size+1).toString() + (size+2).toString()+(size+3).toString();
                var newPage = {
                    _id: newId,
                    name: name,
                    websiteId: vm.websiteId
                };
                PageService.createPage(vm.websiteId, newPage);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
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
            vm.page = PageService.findPageById($routeParams.pid);
        }
        init();

        function updatePage(name) {
            if (name === undefined) {
                vm.error = "page name should be something"
            }
            else {
                var newPage = {
                    _id: vm.page._id,
                    name: name,
                    websiteId: vm.websiteId
                };
                PageService.updatePage(vm.page._id, newPage);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function deletePage() {
            var done = PageService.deletePage(vm.page._id);
            if (done) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else {
                vm.error = "This page not exit in out database";
            }
        }
    }

})();