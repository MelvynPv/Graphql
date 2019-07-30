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

const getAllEmpresa= async (root,args)=>{
    let lstEmpresa = await Empresa.find({cNombre:args.cNombre})
    return lstEmpresa;

}

module.exports = {
    saludo,
    getUsuario,
    getAllEmpresa
}