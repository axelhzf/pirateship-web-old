Torrent = require("./Torrent.coffee")

class Torrents extends Backbone.Collection

    model : Torrent

    fixture: ->
        @reset([
            {title : "Torrent1", link : "http://piratebay.com", seeds : 20, leechers : 30}
            {title : "Torrent2", link : "http://piratebay.com", seeds : 20, leechers : 30}
            {title : "Torrent3", link : "http://piratebay.com", seeds : 20, leechers : 30}
        ])

    findByQuery : (query) ->
        @fetch({url : "/api/find/#{query}"})

module.exports = Torrents