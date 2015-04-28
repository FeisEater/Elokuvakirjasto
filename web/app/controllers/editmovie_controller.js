MovieApp.controller('EditMovieController', function($scope, $routeParams, $location, FirebaseService){
    FirebaseService.getMovie($routeParams.id, function(movie){
        $scope.movie = movie;
    });

    $scope.editMovie = function(){
        if ($scope.movie.title == "" || $scope.movie.director == "" || $scope.movie.year == "" || $scope.movie.description == "")
            return;
        FirebaseService.editMovie($scope.movie);
        $location.path('/movies');
    }
});