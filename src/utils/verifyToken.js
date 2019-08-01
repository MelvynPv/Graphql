const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuarios');

const VerificaToken = async (req) =>{
    const autorizacion = req.headers.authorization;
    console.log(autorizacion);
    if (!autorizacion)
    {
        return req;
    }
    else
    {
        const formToken= autorizacion.replace('JWT ',"");
        const payload=jwt.verify(formToken,process.env.SECRET_KEY)
        if (!payload) {
            return req;
        }
        const usuario = await Usuario.findOne({_id:payload.id});
        if(!usuario){
            return req;
        } 
        return {...req,usuario}
    }
}

module.exports = VerificaToken;