const assert=require('assert') //se encarga de verificar si es verdad o no la copmparacion en los test
const proxyquire=require('proxyquire')  //nos permite que cada vez se hace un require en vez de que traiga el paquete real nos trae el mock

const { moviesMock, MoviesServiceMock,} = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')

describe('routes - movies', function(){
    const route = proxyquire('../routes/movies', {
        '../services/movies' : MoviesServiceMock
    });

    const request = testServer(route)

    describe('GET /movies', function(){
        it('should respond with status 200', function(done){ //Deberias reponder con un status 200
            request.get('/api/movies').expect(200, done); //esto seria nuestro assert
        });

        it('should respond with the list of movies', function(done){
            request.get('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })

                done();
            })
        })

    });
});