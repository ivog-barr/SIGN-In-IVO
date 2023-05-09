const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  estado:{
    type:Boolean,
    default:true
  },
  img:{
    type:String,
    default:'chonkersusmaximussplinksus'
  },
  google:{
    type:Boolean,
    default:false
  },
  rol:{
    type:String,
    required:true,
    default:'User'
  }
});

usuarioSchema.methods.toJSON = function(){
  const {_id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;