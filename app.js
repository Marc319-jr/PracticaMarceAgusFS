//Comienzo de trabajo con cualquier proyecto express
const express = require('express');
const app = express();
const path = require('path');
const logMiddleware = require('./middleware/logMiddleware');



//Declaraciones necesarias para poder utilziar POST
app.use(express.urlencoded ({extended:false}));
app.use(express.json());


//Declaraciones necesarias para PUT Y DELETE
const methodOverrider = require('method-override');
app.use(methodOverrider("_method"));


//Declaraciones de middlewares
const logMiidlewawre = require('./middleware/logMiddleware');



//Declaracion de la carpeta public como carpeta de estilos e imagenes
app.use(express.static('public'));


//Decrlaracion del view enginge EJS
app.set('view engine' , 'ejs');


//Declaracion de rutas
const indexRouter = require('./routes/indexRouter');
const alumnosRouter = require('./routes/alumnosRouter');
const usersRouter = require('./routes/usersRouter');

//Uso de middlewares
app.use(logMiidlewawre);


//Uso de rutas
app.use('/' , indexRouter);
app.use('/alumnos' , alumnosRouter);
app.use('/users' , usersRouter);

//Error 404
app.use((req,res,next) => {
    res.status(404).render('404');
})


//iniciamos al servidor
app.listen(3000 , () => {
    console.log("Trabajando en el servidor 3000")
})