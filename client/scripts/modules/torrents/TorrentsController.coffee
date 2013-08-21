Controller = require("../../controller.coffee")
Torrents = require("../../entities/Torrents.coffee")
TorrentsLayoutView = require("./TorrentsLayoutView.coffee")
TorrentsResultsView = require("./TorrentsResultsView.coffee")
TorrentsSearchFormView = require("./TorrentsSearchFormView.coffee")


class TorrentsRouter extends Backbone.Router

    initialize: (_options) ->
        options = _.extend({}, _options)
        @controller = options.controller

    routes:
        "/search/:query": "search"

    search: (query) ->
        @controller.search(query)

class TorrentsController extends Controller

    initialize: (options) ->
        @torrents = new Torrents()
        @layoutView = new TorrentsLayoutView({el: options.el })
        @searchFormView = new TorrentsSearchFormView({controller : @})
        @resultsView = new TorrentsResultsView({collection: @torrents})

    search: (query) ->
        @router.navigate("/search/#{query}")
        @torrents.findByQuery(query)

    start: ->
        @router = new TorrentsRouter({controller: @})

        @layoutView.render()
        @layoutView.searchForm.show(@searchFormView)
        @layoutView.results.show(@resultsView)


module.exports = TorrentsController