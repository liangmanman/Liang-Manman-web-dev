(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            //1 √
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            //2 √
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            //3 √
            .when("/user/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            //4 √
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            //5 √
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            //6 √
            .when("/user/:userId/website/:websiteId", {
                templateUrl:"views/website/website-edit.view.client.html",
                controller:"EditWebsiteController",
                controllerAs:"model"
            })
            //7 √
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl:"views/page/page-list.view.client.html",
                controller:"PageListController",
                controllerAs:"model"
            })
            //8 √
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl:"views/page/page-new.view.client.html",
                controller:"NewPageController",
                controllerAs:"model"
            })
            //9 √
            .when("/user/:userId/website/:websiteId/:pageId", {
                templateUrl:"views/page/page-edit.view.client.html",
                controller:"EditPageController",
                controllerAs:"model"
            })
            //10
            .when("/user/:userId/website/:websiteId/:pageId/widget", {
                templateUrl:"views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            //11
            .when("/user/:userId/website/:websiteId/:pageId/widget/new", {
                templateUrl:"views/widget/widget-choose.view.client.html",
                controller:"NewWidgetController",
                controllerAs:"model"
            })
            //12
            .when("/user/:userId/website/:websiteId/:pageId/widget/:widgetId", {
                templateUrl:"views/widget/widget-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs:"model"
            })
            // implement html widgetEdit html
            .when("/user/:userId/website/:websiteId/:pageId/widget/:widgetId/html", {
                templateUrl:"views/widget/widget-html-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs:"model"
            })
            .when("/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            });


    }
})();