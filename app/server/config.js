var path = require("path");
var _ = require("underscore");

var configurations = {
  base: {
    name: "koa-base-app",
    port: process.env.PORT || 3000,
    keys: ['some secret hurr'],
    db: {
      username: "root",
      password: "",
      database: "koa-base-app"
    },
    logs: {
      path: path.join(__dirname, "../../logs")
    }
  },
  development: {},
  test: {},
  production: {}
};

var env = process.env.NODE_ENV || "development";

console.log("Loading configuration: " + env);

var config = configurations.base;
config.env = env;
if (configurations[env]) {
  _.extend(config, configurations[env])
}

module.exports = config;