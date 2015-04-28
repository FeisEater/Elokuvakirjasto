MovieApp.controller('ShowMovieController', function($scope, $routeParams, FirebaseService){
    FirebaseService.getMovie($routeParams.id, function(movie){
        $scope.movie = movie;
    });
});