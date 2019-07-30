const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    cNombre: {
        type: String,
        required: true
    },
    cContrasenia: {
        type: String,
        required: true
    },
    iTipoUsuario: {
        type: Number,
        required: true
    },
    img: {
        type:String,
        default:''
    },
    dtFechaCreacion:{
        type:Date,
        default:new Date()
    }
});

module.exports = mongoose.model('Usuario',UsuarioSchema);