const moongoose = require('mongoose');
const Schema=moongoose.Schema;

const empresaSchema = new Schema ({
   // iIdEmpresa:Int,
    cNombreEmpresa:{type:String, required:true},
    cRFC:{type:String, required:true},
    cCorreo:{type:String, required:true},
    cImagen:{type:String, default:''},
    dtFechaCreacion:{type:Date, default:Date.now},
    dtFechaModificacion:{type:Date, default:Date.now},
    lActivo:{type:Boolean, default:true},
    Usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }
});


module.exports = moongoose.model('empresa',empresaSchema); 
