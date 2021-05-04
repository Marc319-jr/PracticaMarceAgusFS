let fs = require('fs');
const {validationResult} = require('express-validator');
const controller = {
    register: (req,res) => {
        console.log("enviando a la vista de regisrar");
        res.render('./users/register');
    },


    login: (req,res) => {
        console.log("enviando a la vista de login");
        res.render('./users/login');
    },

    save: (req,res) => {
        console.log("Creando un usuario");
        let errors = (validationResult)(req);
        console.log(errors)
        if(errors.isEmpty())
        {
            let archivoUsers = fs.readFileSync('users.JSON' , {encoding: 'utf-8'});
            let users;
            if(archivoUsers == "")
            {
                users = [];
                console.log("lei de un base de datos vacia");
            }
            else
            {
                users = JSON.parse(archivoUsers);
                console.log("lei de una base de datos que ya tiene info")
            }
         
            console.log("Creando un usuario con la siguiente info: ");
            console.log(req.body);
           
                let nuevoUser = {
                    id: users.length+1,
                    firstname: req.body.username,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    pass: req.body.password
    
                }
              
                
        
                users.push(nuevoUser);
                console.log("guarde el alumno en el array ahora lo escribo en el archivo");
        
                let usersJSON = JSON.stringify(users);
                fs.writeFileSync('users.JSON',usersJSON);
    
    
    
                console.log("infromacion guardada correctamente");
                res.redirect('/')
        }
        else {
            res.render('./users/register' , {errors: errors.array(), old: req.body });
        }
    
    
        

    }
}




module.exports = controller;