const authSchema = require('../schemas/auth.schema');
const HTTPError = require('../utils/errors/HTTPError');

const tokenValidation = (schema) => (req, res, next) => {
    const token = req.headers.authorization;
    try{
        // eslint-disable-next-line no-unused-vars
        const {value, error} = schema.validate(token);
        
        if(error){
            throw new HTTPError(error.message, 401);
        }
        next();
    }
    catch(err){
        if(err instanceof HTTPError){
            res.status(err.code).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    }
};
const bodyValidation = (schema) => (req, res, next) => {
    try{
        const {value, error} = schema.validate(req.body);
        if(error){
            throw new HTTPError(error.message, 400);
        }
        req.body = value;
        next();
    }
    catch(err){
        if(err instanceof HTTPError){
            res.status(err.code).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    }
};



module.exports = {bodyValidation, tokenValidation}; 