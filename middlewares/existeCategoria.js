const { default: mongoose } = require("mongoose");
const { Categoria } = require("../models/categoria");
const Producto = require("../models/producto");

 // Reemplaza con el modelo correspondiente a tu categoría

// Middleware para verificar si el ID de categoría existe en la base de datos
const categoriaMongoValida = async (req, res, next) => {
  let { categoria } = req.body;

  if(!mongoose.Types.ObjectId.isValid(categoria)){
    return res.status(400).json({
        msg:"No es una id de mongo valida"
    });

  };
  next();
};

module.exports = {
    categoriaMongoValida
}