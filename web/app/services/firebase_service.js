MovieApp.service('FirebaseService', function($firebase){
    var ref = new Firebase('https://luminous-inferno-1799.firebaseio.com/movies');
    var sync = $firebase(ref);
    var movies = sync.$asArray();

    this.addMovie = function(movie){
      movies.$add(movie);
    }

    this.getMovies = function(){
      return movies;
    }

    this.editMovie = function(movie){
      movies.$save(movie);
    }

    this.removeMovie = function(movie){
      movies.$remove(movie);
    }
});