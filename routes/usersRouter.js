const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
/*MULTER YA READY POR SI A CASO...
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '../public/image/usersImages'))
    },
    filename: (req,file,callback) => {
        const newFileName = 'alumno-' + Date.now() + path.extname(file.originalname);
        callback(null,newFileName);
    }
});

let fileUpload = multer({storage});
*/

//Validaciones

const validateCrearteForm = [
    body('username').notEmpty().withMessage('Debes completar el campo de Nombre!'),
    body('lastname').notEmpty().withMessage('Debes completar el campo de Apellido!'),
    body('email').isEmail().withMessage('Debes completar un Email valido!'),
    body('password').notEmpty().withMessage('Debes completar el campo de Password!'),
];


//GETS
router.get('/register' , usersController.register);
router.get('/login' , usersController.login);


//POSTS

router.post('/register' , validateCrearteForm,usersController.save);







module.exports = router;