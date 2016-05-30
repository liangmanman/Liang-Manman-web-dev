/**
 * Created by liangmanman1 on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.returnUrl = returnUrl;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function returnUrl(url) {
            var id = url.substr(url.length - 11);

            var result = "https://www.youtube.com/embed/" + id;
            var html = $sce.trustAsResourceUrl(result);
            return html;
        }

        // function editWidget(widgetId) {
        //    
        //    
        // }


    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pid;
        }
        init();

        function createWidget(type) {
            var id =  (new Date()).getTime().toString();
            if (type === "header") {
                var newHeader = {
                  _id: id, widgetType: "HEADER", pageId: vm.pageId, size:2, text:""
                };
                var result = WidgetService.createWidget(vm.pageId, newHeader);
                if (result) {
                    $location.url("user/" + vm.userId
                        + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + id);
                }
            }
            else if (type === "image") {
                var newImage = {
                    _id: id, widgetType: "IMAGE", pageId: vm.pageId, width: "not defined", url: "not defined"
                };
                var result = WidgetService.createWidget(vm.pageId, newImage);
                if (result) {
                    $location.url("user/" + vm.userId
                        + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + id);
                }
            }
            else if (type === "youtube") {
                var newYoutube = {
                    _id: id, widgetType: "YOUTUBE", pageId: vm.pageId, width: "not defined", url: "not defined"
                };
                var result = WidgetService.createWidget(vm.pageId, newYoutube);
                if (result) {
                    $location.url("user/" + vm.userId
                        + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + id);
                }
            }
            else {
                return false;
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgetType = vm.widget.widgetType;
        }
        init();
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        
        function updateWidget() {

            var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
            if (result) {
                $location.url("/user/" + vm.userId
                    + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget");
            }
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if (result) {

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget");
            }
        }



    }

})();