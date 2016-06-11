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
            vm.pageId = $routeParams.pageId;
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
        };
        init();

        function returnUrl(url) {
            var id = url.substr(url.length - 11);

            var result = "https://www.youtube.com/embed/" + id;
            var html = $sce.trustAsResourceUrl(result);
            return html;
        }
        $(".widget-container")
            .sortable({axis: "y"});
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pageId;
        }
        init();

        function createWidget(type) {
            if (type === "header") {
                var newHeader = {
                  type: "HEADING", _page: vm.pageId, size:2, text:"not defined yet"
                };
                WidgetService.createWidget(vm.pageId, newHeader)
                    .then(function (response) {
                        $location.url("user/" + vm.userId
                            + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + response.data._id);
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }
            else if (type === "image") {
                var newImage = {
                    type: "IMAGE", _page: vm.pageId, width: "not defined", url: "not defined"
                };
                WidgetService.createWidget(vm.pageId, newImage)
                    .then(function (response) {
                        $location.url("user/" + vm.userId
                            + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + response.data._id);
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }
            else if (type === "youtube") {
                var newYoutube = {
                    type: "YOUTUBE", _page: vm.pageId, width: "not defined", url: "not defined"
                };
                WidgetService.createWidget(vm.pageId, newYoutube)
                    .then(function (response) {
                        $location.url("user/" + vm.userId
                            + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + response.data._id);
                    },
                    function (error) {
                        vm.error = error.data;
                    });
            }
            else if (type === "html") {
                var newHtml = {
                    type: "HTML", _page: vm.pageId, width: "not defined", url: "not defined"
                };
                WidgetService.createWidget(vm.pageId, newHtml)
                    .then(function (response) {
                        $location.url("user/" + vm.userId
                            + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget/" + response.data._id);
                    }, function (error) {
                        vm.error = error.data;
                    });
            }

            else {
                return false;
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }
        init();
        
        function updateWidget() {

            WidgetService.updateWidget(vm.widgetId, vm.widget)
                .then(function (response) {
                        $location.url("/user/" + vm.userId
                            + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget");
                },
                function (error) {
                    vm.error = error.data;
                });

        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if (result) {

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/" + vm.pageId + "/widget");
            }
        }



    }

})();