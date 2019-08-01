const bCrypt = require('bcrypt');
const Usuario = require('../models/Usuarios');
const createToken = require('../utils/createToken');

const autentificacion = (data) => {
    return new Promise((resolve,reject) => {
        let {cCorreo,cContrasenia} = data;
        Usuario.findOne({cCorreo})
        .then((usuario) => {
            if(!usuario){
                reject(new Error(`El correo del usuario ingresado no se encontro`))
            } 
            bCrypt.compare(cContrasenia,usuario.cContrasenia,(err,isValido) =>{
                if(err){
                    reject(new Error(`Ocurrio un error al ingresar`))
                } 

                isValido ? resolve(createToken(usuario)): reject(new Error(`Contraseña Incorrecta!`))
            })
        })
    })
};

module.exports = autentificacion;