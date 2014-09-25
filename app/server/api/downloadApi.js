var exec = require("co-exec");
exports.download = function* () {
  var magnet = this.query.magnet;
  console.log(this.query);
  console.log("magnet", magnet);
  var cmd = 'open /Applications/uTorrent.app ' + magnet + '';
  try {
    yield exec(cmd);
    this.body = {error: false}
  } catch (e) {
    this.body = {error: true}
  }
};