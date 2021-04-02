const boom = require('@hapi/boom');
const { config } = require('../../config/index')

function withErrorStack(error, stack){
    if(config.dev){
        return { ...error, stack}
    }

    return error;
}

//Poner estrutura a los errores boom
function wrapErrors(err, req, res, next){
    if(!err.isBoom){
        next(boom.badImplementation(err))
    }

    next(err)
}

//funcionalidad: midleware q se encarga de imprimir nuestros errores
function logErrors(err, req, res, next){
    console.log(err);
    next(err)

}

//midleware q me va ayudar a dar manejo al error
function errorHandler(err, req, res, next){
    const { output: { statusCode, payload } } = err;

    res.status(statusCode)
    res.json(withErrorStack(payload, err.stack))
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
}