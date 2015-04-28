MovieApp.controller('AddMovieController', function($scope, $location, FirebaseService){
    $scope.addMovie = function(){
        if ($scope.newTitle == "" || $scope.newDirector == "" || $scope.newYear == "" || $scope.newDescription == "")
            return;
        FirebaseService.addMovie({
            title: $scope.newTitle,
            director: $scope.newDirector,
            year: $scope.newYear,
            description: $scope.newDescription
        });
        $scope.newTitle = "";
        $scope.newDirector = "";
        $scope.newYear = "";
        $scope.newDescription = "";
        //$scope.addMovieForm.$setPristine();
        $location.path('/movies');
    }
});