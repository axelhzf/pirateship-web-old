class TorrentsSearchFormView extends Backbone.Marionette.ItemView

    initialize: (options) ->
        @controller = options.controller

    template: "torrents-search-form"
    className: "torrents-search-form"

    events:
        "submit": "onSubmit"

    onSubmit: (e) ->
        e.preventDefault()
        value = @$("input").val()
        @controller.search(value)


module.exports = TorrentsSearchFormView