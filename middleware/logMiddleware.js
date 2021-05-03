const fs = require('fs');
function logMiidlewawre(req,res,next) {
    fs.appendFileSync('log.txt' , 'Se ingreso en la pagina: ' + req.url);
    next();
}



module.exports = logMiidlewawre;