var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.run(function(AuthenticationService, $rootScope){
  $rootScope.logOut = function(){
    AuthenticationService.logUserOut();
  };

  $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

MovieApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

MovieApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: 'ListMoviesController',
		templateUrl: 'app/views/list.html',
                resolve: {
                    currentAuth: function(AuthenticationService) {
                      return AuthenticationService.checkLoggedIn();
                    }
                }
	})
        .when('/movies', {
		controller: 'ListMoviesController',
		templateUrl: 'app/views/list.html',
                resolve: {
                    currentAuth: function(AuthenticationService) {
                      return AuthenticationService.checkLoggedIn();
                    }
                }
        })
        .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/new.html',
                resolve: {
                    currentAuth: function(AuthenticationService) {
                      return AuthenticationService.checkLoggedIn();
                    }
                }
        })
        .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html'
        })
        .when('/movies/:id', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show.html'
        })
        .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit.html',
                resolve: {
                    currentAuth: function(AuthenticationService) {
                      return AuthenticationService.checkLoggedIn();
                    }
                }
        });

});