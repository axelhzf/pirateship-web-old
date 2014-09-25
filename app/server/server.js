var koa = require("koa");

var _ = require("underscore");
var co = require("co");

var koaBody = require("koa-body");
var views = require("koa-views");
var mount = require("koa-mount");
var session = require('koa-session');
var flash = require("koa-flash");
var staticCache = require('koa-static-cache');

var config = require("./config");
var logger = require("./logger");
var routes = require("./routes");

var app = koa();

app.use(views('views', {
  default: 'jade'
}));

mountStatic("/assets", __dirname + '/../client');
mountStatic("/assets", __dirname + '/../assets');
mountStatic("/assets", __dirname + '/../.assets');

if (config.env === "development") {
  app.use(require("koa-logger")());
}

app.use(require("./error")());
app.use(koaBody());
app.keys = config.keys;
app.use(session());
app.use(flash());


//locals
app.use(function *(next) {
  this.locals = {
    _: _,
    flash: this.flash,
    csrf: this.csrf,
    config: config,
    requestPath: this.request.path,
    routeUrl: routes.routeUrl
  };
  yield *next;
});

//routes
routes.configure(app);


// server methods
var server;
exports.start = function* () {
  server = app.listen(config.port);

  if (config.env === "development") {
    var gulp = require("gulp");
    require("../../gulpfile");
    gulp.start("watch");
  }

};

exports.stop = function* () {
  server.close();
};

//
if (require.main === module) {
  co(function* () {
    yield exports.start()
  })();
}

//
function mountStatic (url, path) {
  var assets = koa();
  assets.use(staticCache(path, {
    maxAge: 2 * 60 * 60
  }));
  app.use(mount(url, assets));
}