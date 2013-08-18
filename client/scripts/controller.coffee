class Controller

    constructor: (_options)->
        options = _.extend({}, _options)
        @initialize(options)

    initialize: ->

    start: ->

    destroy: ->


_.extend(Controller, Backbone.Events);

module.exports = Controller