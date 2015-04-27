MovieApp.controller('ListMoviesController', function($scope, $routeParams, FirebaseService){
    $scope.movies = FirebaseService.getMovies();
});