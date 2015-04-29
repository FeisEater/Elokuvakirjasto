MovieApp.controller('SearchMoviesController', function($scope, OMDbService){
    $scope.search = function(){
        OMDbService.findMovie($scope.name, $scope.year).success(function(movies){
              if (movies.Error != undefined)
              {
                  $scope.movies = [];
                  $scope.count = 0;
                  return;
              }
              $scope.movies = movies.Search;
              $scope.count = $scope.movies.length;
        });
    }
});