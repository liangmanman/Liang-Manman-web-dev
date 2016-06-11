/**
 * Created by liangmanman1 on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget

    };
    return api;
    
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }
    
    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }
    
    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {

        if (widget.type === 'HEADING') {
            console.log("into heading");
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        text: widget.text,
                        size: widget.size
                    }
                });
        }
        else if (widget.type === 'IMAGE'
            || widget.type === 'YOUTUBE') {
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        width: widget.width,
                        url: widget.url
                    }
                });
        }
        else if (widget.type === 'HTML') {
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        text: widget.text
                    }
                });
        }
        else if (widget.type === 'INPUT') {
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        //TODO: DON'T KNOW WHAT TO UPDATE HERE
                    }
                });
        }
        else {
            console.log("can't find type");
        }
    }


    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {

    }
};