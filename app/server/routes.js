var router = require("koa-router");

var controller = require("./controllers/controller");
var moviesApi = require("./api/moviesApi");
var downloadsApi = require("./api/downloadApi");

var r = new router();
r.get("/", controller.render("index/index"));
r.get("/api/movies/featured", moviesApi.featured);
r.get("/api/download", downloadsApi.download);


exports.configure = function (app) {
  app.use(notFound);
  app.use(r.middleware());
};

exports.routeUrl = function () {
  return r.url.apply(r, arguments);
};

function* notFound (next) {
  if (r.match(this.path)) {
    yield next;
    if (this.status === 405) this.throw("405 / Method not Allowed", 405);
  } else {
    this.throw('404 / Not Found', 404)
  }
}