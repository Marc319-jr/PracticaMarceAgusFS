let fs = require('fs');
const controller = {

    crear: (req,res) =>{
        res.render('./alumnos/crearAlumno');
        console.log("Estoy yendo a crear un alumno")
        //Esta funcion es el GET, lo unico que esa es renderisar a la vista de Creacion de alumno
    },


    guardar: (req,res) => {
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        let alumnos;
        if(archivoAlumnos == "")
        {
            alumnos = [];
            console.log("lei de un base de datos vacia");
        }
        else
        {
            alumnos = JSON.parse(archivoAlumnos);
            console.log("lei de una base de datos que ya tiene info")
        }
        console.log("Creando un usuario con la siguiente info: ");
        console.log(req.body);
        let nuevoAlumno = {
            id: alumnos.length+1,
            name: req.body.name,
            edad: req.body.edad,
            profesion: req.body.profesion,
            nacionalidad: req.body.nacionalidad
        };
        
        alumnos.push(nuevoAlumno);
        console.log("guarde el alumno en el array ahora lo escribo en el archivo");

        let alumnosJSON = JSON.stringify(alumnos);
        fs.writeFileSync('alumnos.JSON',alumnosJSON);



        //faltaria aca guardar la info 

        res.redirect('/');


        //Esta ruta Guarda la infromacion del fomulario de creacion de alumno. como?
        //1. Si vamos al ruter de alumno podemos ver que /crear existe 2 veces. una para el GET y otra para el POST
        //El /crear con el get se dedica a la funcion que esta arriba (renderisa hacia la vista de presentar formulario)
        //El /crear con el POST, se dedica a obtener la informacion ingresada en el formulario para que 
    },



    presentar: (req,res) =>{
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        let alumnos;
        if(archivoAlumnos == "")
        {
            alumnos = [];
            console.log("lei de un base de datos vacia");
        }
        else
        {
            alumnos = JSON.parse(archivoAlumnos);
            console.log("lei de una base de datos que ya tiene info")
        }
        presentar = req.query.userID;
        console.log("Presentando al alumno con id: " + presentar + " y nombre: " + req.query.userName + " Atravez de Querystring")
        alumnoPresentar = alumnos[presentar-1];
        console.log(alumnoPresentar)

        res.render('./alumnos/presentarAlumno', {'alumnoPresentar':alumnoPresentar} ) //lado izquierdo es el nombre de la variable en el HTML//
    //Esta funcion presente a un alumno. como?
    //1. En el view de index o de resultadoBusqueda atravez de metodo GET obtenemos el userdID con req.query.userID
    //2. Una vez que sabemos el ID del alumno a presentar le restamos 1 para que coincida con el array (Los arrays comienzan en 0)
    //3. Para finalizar, renderisamos hacia la vista de presentarAlumno a nuestro alumno donde con EJS seamos capazes de utilizar toda la info que llego con alumnoPresentar! 
    },



    search: (req,res) =>{
        console.log("Buscando un usuario");
        let loQueBusco = req.query.search;
        console.log("Lo que fue buscado: " + loQueBusco)
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        let alumnos;
        if(archivoAlumnos == "")
        {
            alumnos = [];
            console.log("lei de un base de datos vacia");
        }
        else
        {
            alumnos = JSON.parse(archivoAlumnos);
            console.log("lei de una base de datos que ya tiene info")
        }        let userResults = [];
        for(let i = 0;i< alumnos.length; i ++)
        {
            if(alumnos[i].name.includes(loQueBusco))
            {
                userResults.push(alumnos[i]);
            }
        }

        res.render('./alumnos/resultadoBusqueda' , {'userResults' : userResults});
    //Esta funcion busca un alumno. como?
    //1. En la vista de index dodne tenemos a la barra de busqueda le asignamos el nombre de search
    //2. La informacion buscada viajara atravez de GET hacia la variable req.query.search
    //3. desarollaremos un pequeño algoritmo que se dedicara a busacr cual de nuestro listado de alumnos contiene el resultado de busqueda
    //4. Renderisamos al resultado de busaqueda que coincide hacia la vista de resultado busqueda
    },


    edit: (req,res) => {
        console.log("Estoy yendo a editar un usuario");
        let idUser = req.params.id;
        console.log("El usurion que me pidieron editar es el: " + (idUser) + " Atravez de req.params")
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        let alumnos;
        if(archivoAlumnos == "")
        {
            alumnos = [];
            console.log("lei de un base de datos vacia");
        }
        else
        {
            alumnos = JSON.parse(archivoAlumnos);
            console.log("lei de una base de datos que ya tiene info")
        }
        let alumnoToEdit = alumnos[req.params.id];
        console.log("Me piden editar a:" );
        console.log(alumnoToEdit)
        res.render('./alumnos/editarAlumno' , {'alumnoToEdit' : alumnoToEdit});
    },
 
    update: (req,res) => {
    console.log("Estoy actualizando la info")
    let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
    let alumnos;
    alumnos = JSON.parse(archivoAlumnos);
    let alumnoToEdit = alumnos[req.params.id];
    console.log("El alumno a editar es: ")
    console.log(alumnoToEdit);
    alumnoToEdit.name = req.body.name;
    alumnoToEdit.edad = req.body.edad;
    alumnoToEdit.profesion = req.body.profesion;
    alumnoToEdit.nacionalidad = req.body.nacionalidad;
    console.log("El alumno a editado es: ")
    console.log(alumnoToEdit);
    alumnos[req.params.id] = alumnoToEdit;
    let alumnosJSON = JSON.stringify(alumnos);
    fs.writeFileSync('alumnos.JSON',alumnosJSON);
    res.redirect('/')
    },


    delete: (req,res) => {
        console.log("Yendo a eliminar al alumno")
        idEliminar = req.params.id;
        console.log(idEliminar);
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        alumnos = JSON.parse(archivoAlumnos);
        console.log(alumnos);
        let nuevoArray = [];
        for(let i = 0 ;i< alumnos.length; i++)
        {
            if(alumnos[i].id-1 != idEliminar)
            {
                alumnos[i].id = i+1;
                nuevoArray.push(alumnos[i]);
            }
        }

        console.log("El array queda asi:");
        console.log(nuevoArray)
        let alumnosJSON = JSON.stringify(nuevoArray);
        fs.writeFileSync('alumnos.JSON',alumnosJSON);
        res.redirect('/')

    }

}

module.exports = controller;