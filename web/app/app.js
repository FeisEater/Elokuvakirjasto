var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

MovieApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: 'ListMoviesController',
		templateUrl: 'app/views/list.html'
	})
        .when('/movies', {
		controller: 'ListMoviesController',
		templateUrl: 'app/views/list.html'
        })
        .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/new.html'
        })
        .when('/movies/search', {
                controller: 'SearchMoviesController',
                templateUrl: 'app/views/search.html'
        })
        .when('/movies/:id', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show.html'
        })
        .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit.html'
        });

});