const express = require('express');
const MoviesService = require('../services/movies')

const {movieIdSchema, createMovieSchema, updateMovieSchema} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS,SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')


function moviesApi(app){

    const router = express.Router()
    app.use("/api/movies", router) //Establece la ruta base

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next){   //get al home(/) que es (/api/movies)
        
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

        const { tags } = req.query;

        try {
            // const movies = await Promise.resolve(moviesMock)
            const movies = await moviesService.getMovies({ tags })

            //throw new Error('Error getting movies')

            res.status(200).json({
                data:movies,
                message: 'movies listed'

            })
        } catch (error) {
            next(error)
        }

    })

    router.get("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        const { movieId} = req.params

        try {
            const movies = await moviesService.getMovie({ movieId })

            res.status(200).json({
                data:movies,
                message: 'movies retrieved'

            })
        } catch (error) {
            next(error)
        }

    })

    router.post("/", validationHandler(createMovieSchema) ,async function(req, res, next){
        const { body: movie } = req //{body : movie}  ----> a body se le pone un alias ques es movie
        try {
            const createdMovieId = await moviesService.createMovie({ movie })

            res.status(201).json({
                data:createdMovieId,
                message: 'movie created'

            })
        } catch (error) {
            next(error)
        }

    })

    router.put("/:movieId", validationHandler({movieId: movieIdSchema}, 'params') ,validationHandler(updateMovieSchema) ,async function(req, res, next){
        const { movieId} = req.params
        const { body: movie } = req

        try {
            const updateMovieId = await moviesService.updateMovie({movieId, movie})

            res.status(200).json({
                data:updateMovieId,
                message: 'movies updated'

            })
        } catch (error) {
            next(error)
        }

    })

    router.delete("/:movieId", validationHandler({movieId: movieIdSchema}, 'params') ,async function(req, res, next){
        const { movieId } = req.params
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId })

            res.status(200).json({
                data:deletedMovieId,
                message: 'movies deleted'

            })
        } catch (error) {
            next(error)
        }

    })
}

module.exports = moviesApi



