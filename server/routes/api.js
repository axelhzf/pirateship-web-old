var pirateship = require('pirateship');
var exec = require('child_process').exec;

var api = function (app) {
  app.get("/api/find/:query", function (req, res) {
    var query = req.param("query");
    console.log("query", query);
    pirateship.find(query, function (err, torrents) {
      console.log(torrents);
      res.json({torrents : torrents});
    });
  });

  app.get("/api/download/:magnet", function (req, res) {
    var magnet = req.originalUrl.substring("/api/download/".length);
    var cmd = 'ssh imac "open /Applications/uTorrent.app ' + magnet + '"';
    exec(cmd, function (err) {
      res.json({msg: "Downloaded"});
    });
  });
};

module.exports = api;
