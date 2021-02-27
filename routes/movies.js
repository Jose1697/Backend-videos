const express = require('express');
const MoviesService = require('../services/movies')

function moviesApi(app){

    const router = express.Router()
    app.use("/api/movies", router)

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next){

        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags })

            res.status(200).json({
                data:movies,
                message: 'movies listed'

            })
        } catch (error) {
            next(error)
        }

    })

    router.get("/:movieId", async function(req, res, next){
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

    router.post("/", async function(req, res, next){
        const { body: movie } = req
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

    router.put("/:movieId", async function(req, res, next){
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

    router.delete("/:movieId", async function(req, res, next){
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



