const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');



//GETS
router.get('/crear' , alumnosController.crear);
router.get('/presentar' , alumnosController.presentar);
router.get('/search' , alumnosController.search);
router.get('/editar/:id' , alumnosController.edit)


//POSTS
router.post('/crear' ,alumnosController.guardar);

//PUT
router.put('/:id' ,alumnosController.update);


//DELETE
router.delete('/delete/:id' , alumnosController.delete);




module.exports = router;