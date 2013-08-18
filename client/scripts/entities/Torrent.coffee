class Torrent extends Backbone.Model

    download: ->
        $.get("/api/download/#{this.get('link')}")

module.exports = Torrent