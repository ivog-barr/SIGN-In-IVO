const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
      unique:true
    },

    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
  });

  categoriaSchema.methods.toJSON = function(){
    const {__v,estado, ...data} = this.toObject();
    return data;
  }

  const Categoria = mongoose.model('Categoria', categoriaSchema);


  module.exports = {
    Categoria
  }
