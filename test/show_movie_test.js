describe('Show movie', function(){
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

    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
	      scope = $rootScope.$new();
	      // Muista vaihtaa oikea kontrollerin nimi!
	      controller = $controller('ShowMovieController', {
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
  	* Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
  	* Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
  	* käyttämällä toBeCalled-oletusta.
	*/
	it('should show current movie from Firebase', function(){
                expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
		expect(scope.movie.title).toBe("Full metal jacket");
		expect(scope.movie.director).toBe("Stanley Kubrick");
		expect(scope.movie.year).toBe(1989);
		expect(scope.movie.description).toBe("Gomer Pyle is a scrub");
        });
});