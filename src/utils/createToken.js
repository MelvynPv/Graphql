const jwt = require('jsonwebtoken');

const createToken = (usuario) =>{
    console.log(usuario);
    const payload = {
        id: usuario._id,
        cCorreo: usuario.cCorreo,
        cNombre:usuario.cNombre
    }

    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"2h"})
}

module.exports = createToken;