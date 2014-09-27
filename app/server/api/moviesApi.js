var _ = require("underscore");
var request = require("co-request");
var parallel = require("co-parallel");
var Cacheman = require("cacheman");
var thunkify = require("thunkify");
var log = require("../logger");

var APIKEY = "5a6741f036689886bb9d030fed43af82";

var cacheOptions = {
  ttl: "10h",
  engine: "file"
};
var cache = new Cacheman('trakt', cacheOptions);

exports.featured = function* () {
  var totalSets = 3;
  var movies = [];
  for (var i = 0; i < totalSets; i++) {
    var moviesSet = yield getFeaturedSet(i);
    movies.push(moviesSet);
  }
  movies = _.flatten(movies, true);
  this.body = movies;
};

function* getFeaturedSet (setNumber) {
  console.log("get featured set ", setNumber);
  var url = "https://yts.re/api/list.json?sort=seeds&limit=50&set=" + setNumber;
  var result = yield request.get({url: url, json: true});
  var body = result.body;
  if (body.MovieList) {
    var movies = _.map(body.MovieList, parseMovieItem);
    movies = _.uniq(movies, function (movie) {
      return movie.imdb_id;
    });
    movies = yield parallel(movies.map(fillDataFromTrakt), 10);
    return movies
  }
}

function parseMovieItem (movieItem) {
  return {
    title: movieItem.MovieTitleClean,
    year: movieItem.MovieYear,
    imdb_id: movieItem.ImdbCode,
    magnet: movieItem.TorrentMagnetUrl
  }
}

function* fillDataFromTrakt (movie) {
  if (movie.imdb_id) {
    var summary = yield getSummary(movie.imdb_id);
    _.extend(movie, _.pick(summary, "tagline", "trailer", "overview", "poster", "genres"));
    return movie;
  }
}

var cacheGet = thunkify(cache.get.bind(cache));
var cacheSet = thunkify(cache.set.bind(cache));

function* getSummary (imdb_id) {
  log.info("Get summary %s", imdb_id);
  var summary = yield cacheGet(imdb_id);
  if (summary) {
    return summary;
  }
  var res = yield request.get({url: "http://api.trakt.tv/movie/summary.json/" + APIKEY + "/" + imdb_id, json: true});
  var body = res.body;
  yield cacheSet(imdb_id, body);
  return body;
}