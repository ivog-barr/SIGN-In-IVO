const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    },

    precio:{
        type:Number,
        default:0
    },

    categoria:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    disponible:{
        type:Boolean,
        default:true
    }
  });

  productSchema.methods.toJSON = function(){
    const {_id, ...user} = this.toObject();
    user.uid = _id;
    return user;
  };

  const Producto = mongoose.model('Producto', productSchema);

module.exports = Producto;