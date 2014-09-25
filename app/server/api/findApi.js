var thunkify = require("thunkify");
var pirateship = require("pirateship");
var pirateshipFind = thunkify(pirateship.find);

exports.find = function* () {
  var query = this.params.query;
  var torrents = yield pirateshipFind(query);
  this.body = {torrents: torrents};
};