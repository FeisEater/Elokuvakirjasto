describe('Add movie', function(){
	var controller, scope;

	var FirebaseServiceMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
                        var movies = [{
                                title: "Matrix",
                                director: "Wachowski bros",
                                year: 1999,
                                description: "People are batteries"
                            },{
                                title: "Full metal jacket",
                                director: "Stanley Kubrick",
                                year: 1989,
                                description: "Gomer Pyle is a scrub"
                            },{
                                title: "Schindler's list",
                                director: "Steven Spielberg",
                                year: 1989,
                                description: "Nazis"
                            }
                        ];
			return {
				getMovies: function(){
                                    return movies
                                },
                                addMovie: function(movie){
                                    movies.push(movie);
                                }
			}
		})();

		// Lisää vakoilijat
	     spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('AddMovieController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
  	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
  	* on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
  	* toBeCalled-oletusta.
	*/
	it('should be able to add a movie by its name, director, release date and description', function(){
            scope.newTitle = "Taxi driver";
            scope.newDirector = "Martin Scorcese";
            scope.newYear = 1979;
            scope.newDescription = "What a lonely taxi driver";
            scope.addMovie();
            expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
            var movies = FirebaseServiceMock.getMovies();
            expect(movies.length).toBe(4);
            expect(movies[3].title).toBe("Taxi driver");
	});

	/*	
	* Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	* Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	* EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	* not.toBeCalled-oletusta (muista not-negaatio!).
	*/
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
            scope.newTitle = "Taxi driver";
            scope.newDirector = "Martin Scorcese";
            scope.newYear = 1979;
            scope.newDescription = "";
            scope.addMovie();
            expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
            var movies = FirebaseServiceMock.getMovies();
            expect(movies.length).toBe(3);
	});
});