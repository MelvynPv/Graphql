const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcrypt');


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
    cCorreo:{
        type:String,
        required:true
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

UsuarioSchema.pre('save',function(next){//no se usa la funcion flecha por que no puedo tener el "this"
    const Usuario = this;
    const SALT_ROUNDS = 10;
    
    bCrypt.genSalt(SALT_ROUNDS,function (err,salt) {
        if(err) {
            return next();
        }
        bCrypt.hash(Usuario.cContrasenia,salt,function(err,hash){
            if(err) {
                return next(err);
            }
            Usuario.cContrasenia = hash;
            next();
        });
    });
    
});

module.exports = mongoose.model('Usuario',UsuarioSchema);