/**
 * Created by liangmanman1 on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "123", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "123", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "123", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "123", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "123", "text": "Lorem ipsum"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;
        
        function createWidget(pageId, widget) {
            widgets.push(widget);
            return true;
        }
        
        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }
        
        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
        }
        
        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;
            
        }
        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        

    }

})();