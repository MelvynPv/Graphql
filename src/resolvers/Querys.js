const Usuario = require("../models/Usuarios");
const Empresa = require("../models/Empresas");

//functions
const saludo = (root,args) => `Hola ${args.name}`;

const getUsuario = async (root,data) => {
    let fintUsu = await Usuario.findOne({cNombre:data.cNombre},(ERR,RES) => {
        return RES;
    });

    return fintUsu;
}
const getEmpresa = async (root,data) => {
    let fintEmpresa = await Empresa.findById(data.id,(ERR,RES) => {
        return RES;
    });
    if(!fintEmpresa) throw new Error(`No se encontro la empresa con la llave indicada`);
    let empresa = await Empresa.findById({_id:fintEmpresa._id}).populate("Usuario");

    return empresa;
}



const getAllEmpresa= async (root,args)=>{
    let lstEmpresa = await Empresa.find().populate('Usuario');
    return lstEmpresa;

}

const getAllUsuarios= async (root,args)=>{
    let lstUsuarios = await Usuario.find().exec();
    return lstUsuarios;

}

module.exports = {
    saludo,
    getUsuario,
    getAllEmpresa,
    getEmpresa,
    getAllUsuarios
}