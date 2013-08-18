Marionette = require("marionette")
TorrentsController = require("./modules/torrents/TorrentsController.coffee")

class App

    start: ->
        @torrentController = new TorrentsController({el : ".content"})
        @torrentController.start()

        Backbone.history.start();

Marionette.Renderer.render = (template, data) ->
    JST[template](data)

window.app = new App()
window.app.start()