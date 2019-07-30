const Usuario = require('../models/Usuarios');
const Empresa = require("../models/Empresas");

const createUsuario = async (root,{data}) =>{
    let newUsuario = new Usuario({
        ...data
    })

    const miUsuario = await newUsuario.save();
    return miUsuario;
};

const createEmpresa = async (root,{data})=>{
           
    let newEmpresa=new Empresa ({
        cNombreEmpresa: data.cNombreEmpresa,
        cRFC:data.cRFC,
        cCorreo:data.cCorreo,
        cImagen:data.cImagen,
        lActivo:data.lActivo,
        Usuario:data.id
    })
   
    const miEmpresa= await newEmpresa.save();
    console.log(miEmpresa);
   const empresa = await Empresa.findById({_id:miEmpresa._id}).populate("Usuario");
   
    return empresa;
}

module.exports = {
    createUsuario,
    createEmpresa
}