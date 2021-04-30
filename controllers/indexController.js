const fs = require('fs');
const controller = {
    index: (req,res) => {
        console.log("Estoy renderisando al view de index");
        let archivoAlumnos = fs.readFileSync('alumnos.JSON' , {encoding: 'utf-8'});
        let alumnos = [];
        if(archivoAlumnos == "")
        {
            console.log("lei de un base de datos vacia por lo tanto aun no tengo alumnos a presentar");
        }
        else
        {
            alumnos = JSON.parse(archivoAlumnos);
            console.log("lei de una base de datos que ya tiene info")
        }

        

        res.render('index' , {'alumnos' : alumnos}); // Aca lo que hacemos es renderizar no solo a la vista index sino que
        //Junto a la localidad de la vista index mandamos la informacion de el array de users

    },


    }





module.exports = controller;