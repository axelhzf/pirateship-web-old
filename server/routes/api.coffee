pirateship = require 'pirateship'
exec = require('child_process').exec

module.exports = (app) ->
    app.get '/api/find/:query', (req, res) ->
        query = req.param('query')
        pirateship.find query, (err, torrents) ->
            res.json(torrents)

    app.get '/api/download/:magnet', (req, res) ->
        magnet = req.originalUrl.substring("/api/download/".length)
        cmd = 'ssh imac "open /Applications/uTorrent.app ' + magnet + '"'
        exec cmd, (error) ->
            res.json {msg : "Downloaded"}