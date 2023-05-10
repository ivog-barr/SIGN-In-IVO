const { request, response } = require("express");
const Producto = require("../models/producto");

const productGet = async (req = request, res = response) => {
  res.json({
    msg: "hola1",
  });
};

const productPost = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { precio, categoria, descripcion } = req.body;

  let producto = await Producto.findOne({ nombre });

  if (producto) {
    return res.json({
      msg: `${nombre} ya existe en la BDD`,
    });
  }

  producto = new Producto({
    nombre,
    usuario: req.authUser._id,
    precio,
    categoria,
    descripcion,
  });

  producto.save();

  res.status(200).json({
    msg: "Item creado satisfactoriamente",
    producto,
  });
};

const productPut = async (req = request, res = response) => {
  res.json({
    msg: "hola3",
  });
};

const productDelete = async (req = request, res = response) => {
  const { id } = req.params;


  if (!req.authUser.estado) {
    return res.status(401).json({
      msg: "Usuario eliminado de la base de datos no puede realizar esta accion",
    });
  };


  if (req.authUser.rol !== "Admin") {
    return res.status(401).json({
      msg: "Usuario no es administrador , no puede realizar esta accion",
    });
  };


  const product = await Producto.findByIdAndUpdate(id,{estado:false,disponible:false},{new:true});
  res.json({
    msg:`Producto con el id de ${id} ha sido eliminado satisfactoriamente`,
    product
  });
};

module.exports = {
  productGet,
  productDelete,
  productPost,
  productPut,
};
