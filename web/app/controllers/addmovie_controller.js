MovieApp.controller('AddMovieController', function($scope, $routeParams, FirebaseService){
    $scope.addMovie = function(){
        console.log("added");
        FirebaseService.addMovie({
            title: 'Forrest Gump'
        });
    }
});