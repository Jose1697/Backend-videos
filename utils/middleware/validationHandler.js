const boom = require('@hapi/boom')   //sirve para validar datos
const joi = require('@hapi/joi')       //Imprime errores comunes en peticiones HTTP


function validate(data, schema){
    const {error} = joi.object(schema).validate(data)
    return error
}


function validationHandler(schema, check = "body"){
    return function(req, res, next){
        const error = validate(req[check], schema);

        error ? next(boom.badRequest(error)) : next()
    }
}

module.exports = validationHandler;