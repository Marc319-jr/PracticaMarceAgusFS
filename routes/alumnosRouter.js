const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const alumnosController = require('../controllers/alumnosController');
const logDBMiddleware = require('../middleware/logDBMiddleware');
//configuracion de multer

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/image/profileImages'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'alumno-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});

let fileUpload = multer({storage});

//RUTAS


//GETS
router.get('/crear' , alumnosController.crear);
router.get('/presentar' , alumnosController.presentar);
router.get('/search' , alumnosController.search);
router.get('/editar/:id' , alumnosController.edit)


//POSTS
router.post('/crear',fileUpload.single('imagen') , logDBMiddleware ,alumnosController.guardar);

//PUT
router.put('/:id' ,logDBMiddleware,alumnosController.update);


//DELETE
router.delete('/delete/:id' ,logDBMiddleware, alumnosController.delete);




module.exports = router;