const express = require('express');
const { moviesMock } = require('../utils/mocks/movies')  //Mocks archivos de datos falsos


function moviesApi(app){

    const router = express.Router()
    app.use("/api/movies", router)

    router.get("/", async function(req, res, next){
        try {
            const movies = await Promise.resolve(moviesMock)

            res.status(200).json({
                data:movies,
                message: 'movies listed'

            })
        } catch (error) {
            next(error)
        }

    })

    router.get("/:movieId", async function(req, res, next){
        try {
            const movies = await Promise.resolve(moviesMock[0])

            res.status(200).json({
                data:movies,
                message: 'movies retrieved'

            })
        } catch (error) {
            next(error)
        }

    })

    router.post("/", async function(req, res, next){
        try {
            const createdMovieId = await Promise.resolve(moviesMock[0].id)

            res.status(201).json({
                data:createdMovieId,
                message: 'movie created'

            })
        } catch (error) {
            next(error)
        }

    })

    router.put("/:movieId", async function(req, res, next){
        try {
            const updateMovieId = await Promise.resolve(moviesMock[0].id)

            res.status(200).json({
                data:updateMovieId,
                message: 'movies updated'

            })
        } catch (error) {
            next(error)
        }

    })

    router.delete("/:movieId", async function(req, res, next){
        try {
            const deletedMovieId = await Promise.resolve(moviesMock[0].id)

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



