Marionette = require("marionette")

class TorrentsLayoutView extends Marionette.Layout

    template: "torrents-layout"

    regions:
        searchForm: ".torrents-search-form"
        results: ".torrents-results"

module.exports = TorrentsLayoutView
