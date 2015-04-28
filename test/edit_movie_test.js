describe('Edit movie', function(){
	var controller, scope;

	var FirebaseServiceMock, RouteParamsMock;

  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MovieApp');

    	FirebaseServiceMock = (function(){
                        return {
				getMovie: function(key, done){
                                    if (key == 'abc'){
                                        done({
                                            title: "Matrix",
                                            director: "Wachowski bros",
                                            year: 1999,
                                            description: "People are batteries"
                                        });
                                    }
                                    if (key == 'def'){
                                        done({
                                            title: "Full metal jacket",
                                            director: "Stanley Kubrick",
                                            year: 1989,
                                            description: "Gomer Pyle is a scrub"
                                        });
                                    }
                                    if (key == 'ghi'){
                                        done({
                                            title: "Schindler's list",
                                            director: "Steven Spielberg",
                                            year: 1989,
                                            description: "Nazis"
                                        });
                                    }
                                },
                                editMovie: function(movie){
                                }
			}
		})();

		RouteParamsMock = (function(){
			return {
				id: 'def'
			}
		})();

		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
            spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('EditMovieController', {
	        $scope: scope,
	        FirebaseService: FirebaseServiceMock,
	        $routeParams: RouteParamsMock
	      });
	    });
  	});

  	/*
  	* Testaa alla esitettyjä toimintoja kontrollerissasi
  	*/

  	/*
  	* Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
  	*/
  	it('should fill the edit form with the current information about the movie', function(){
                expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
		expect(scope.movie.title).toBe("Full metal jacket");
		expect(scope.movie.director).toBe("Stanley Kubrick");
		expect(scope.movie.year).toBe(1989);
		expect(scope.movie.description).toBe("Gomer Pyle is a scrub");
  	})

  	/* 
  	* Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should be able to edit a movie by its name, director, release date and description', function(){
		scope.movie.title = "Fight Club";
                scope.movie.director = "David Fincher";
                scope.movie.year = 1999;
                scope.movie.description = "Two first rules are same";
                scope.editMovie();
                expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
        });

	/*
	* Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	* Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
  	* käyttämällä not.toBeCalled-oletusta.
	*/
	it('should not be able to edit a movie if its name, director, release date or description is empty', function(){
		scope.movie.title = "Fight Club";
                scope.movie.director = "David Fincher";
                scope.movie.year = 1999;
                scope.movie.description = "";
                scope.editMovie();
                expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
	});
});