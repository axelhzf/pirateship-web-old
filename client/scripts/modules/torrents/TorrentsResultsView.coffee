class TorrentsResultsItemView extends Backbone.Marionette.ItemView
    template : "torrents-results-item"
    tagName : "tr"

    events :
        "click" : "download"

    download: (e) ->
        e.preventDefault()
        @model.download()

class TorrentsResultsView extends Backbone.Marionette.CompositeView
    template : "torrents-results"
    itemView : TorrentsResultsItemView
    itemViewContainer: "tbody"
    tagName : "table"
    className : "table table-striped torrents-results"

module.exports = TorrentsResultsView