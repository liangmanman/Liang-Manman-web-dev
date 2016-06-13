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
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
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
                        name: widget.name,
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
                        name: widget.name,
                        text: widget.text
                    }
                });
        }
        else if (widget.type === 'TEXT') {
            return Widget.update(
                {_id: widgetId},
                {
                    $set: {
                        name: widget.name,
                        text: widget.text,
                        rows: widget.rows,
                        placeholder: widget.placeholder,
                        formatted: widget.formatted
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

    function reorderWidget(start, end, pageId) {
        start = parseInt(start);
        end = parseInt(end);
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save();
                            console.log("changed from " + (widget.order + 1) + "to --")
                        } else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("changed from " + (start) + "to" + end)

                        }
                    } else if (start > end) {
                        if (widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save();
                            console.log("changed from " + (widget.order - 1) + "to ++")

                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("changed from " + (start) + "to" + end)

                        }
                    }
                })
            });
    }
};