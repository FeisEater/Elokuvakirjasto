describe('Movie list', function(){
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
                                removeMovie: function(movie){
                                    for (var i in movies){
                                        if(movies[i] == movie) {
                                            movies.splice(i,1);
                                            break;
                                        }
                                    }
                                }
			}
		})();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
	    spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('ListMoviesController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/ 
	it('should list all movies from the Firebase', function(){
                expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
		expect(scope.movies[0].year).toBe(1999);
		expect(scope.movies[1].title).toBe("Full metal jacket");
		expect(scope.movies[2].description).toBe("Nazis");
        });

	/* 
	* Testaa, että elokuvan pystyy poistamaan Firebasesta.
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to remove a movie', function(){
		scope.removeMovie(scope.movies[1]);
                expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
		expect(scope.movies.length).toBe(2);
		expect(scope.movies[0].title).toBe("Matrix");
		expect(scope.movies[1].description).toBe("Nazis");                
	});
});