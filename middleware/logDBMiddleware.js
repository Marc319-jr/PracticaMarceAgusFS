//es el middleware de todo lo que deja cosas en la base de datos

const fs = require('fs');
const logMiidlewawre = require('./logMiddleware');

function logDBMiddleware (req,res,next){
    fs.appendFileSync('logDB.txt' , 'Se creo un registro al ingresar en: ' + req.url),
    next();
} 


module.exports = logDBMiddleware;