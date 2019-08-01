const Usuario = require('../models/Usuarios');
const Empresa = require("../models/Empresas");
const auth = require("../utils/autentificacion");
const storage = require("../utils/storage");

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
        Usuario:data.Usuario
    })
   
    const miEmpresa= await newEmpresa.save();
    const empresa = await Empresa.findById({_id:miEmpresa._id}).populate("Usuario");
   
    return empresa;
}

const login = async (root, {data}) => {
    const token = await auth(data)
    .catch((err)=> new Error(err))
    return {
        token,
        mensaje: "ok"
    };
}

const addPhoto = async( root,args)=> {
    console.log(args);
    if(args.photo){
        const {createReadStream} = await args.photo;
        const stream = createReadStream();
        console.log(`Stream ==> ${stream}`);
        const url = await storage({stream})
        console.log(url);
        await Usuario.findOneAndUpdate(args.id,{img:url.url})
        return url.url;
    }   
};

module.exports = {
    createUsuario,
    createEmpresa,
    login,
    addPhoto
}