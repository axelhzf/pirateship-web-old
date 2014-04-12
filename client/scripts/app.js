var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "templates/torrents.html",
      controller: "TorrentsController"
    })
    .otherwise({
      redirectTo: "/"
    });
});

app.factory("torrentService", function ($http, $q) {
  var torrentService = {
    findByQuery: function (query) {
      if (query) {
        var url = "/api/find/" + query;
        return $http.get(url);
      } else {
        return $q.when(undefined);
      }
    },
    download : function (link) {
      return $http.get("/api/download/" + link);
    }
  };
  return torrentService;
});

app.controller("TorrentsController", function ($scope, torrentService) {

  function searchTorrents() {
    torrentService.findByQuery($scope.query).then(function (response) {
      if (response) {
        $scope.torrents = response.data.torrents;
      } else {
        $scope.torrents = [];
      }

    });
  }
  var debounceSearchTorrents = _.debounce(searchTorrents, 500);
  $scope.searchTorrents = searchTorrents();

  $scope.$watch("query", function (newValue, oldValue) {
    console.log("change query", newValue);
    if (newValue !== oldValue) {
      debounceSearchTorrents()
    }
  });

  $scope.downloadTorrent = torrentService.download;


});