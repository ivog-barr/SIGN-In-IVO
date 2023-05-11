const { request, response } = require("express");
const { default: mongoose } = require("mongoose");
const Usuario = require("../models/user");
const { Categoria } = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitidas = ["usuario", "categoria", "producto"];

const buscarUsuarios = async (termino, res = response) => {
  const regex = new RegExp(termino, "i");
  const esMongoId = mongoose.Types.ObjectId.isValid(termino);
  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { email: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    usuarios,
  });
};

const buscarCategorias = async (termino, res) => {
  const regex = new RegExp(termino, "i");
  const esMongoId = mongoose.Types.ObjectId.isValid(termino);
  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const categorias = await Categoria.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  }).populate("categoria", "nombre");

  res.json({
    categorias,
  });
};

const buscarProductos = async (termino, res) => {
  const regex = new RegExp(termino, "i");
  const esMongoId = mongoose.Types.ObjectId.isValid(termino);
  if (esMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const productos = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    productos,
  });
};

const buscarController = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "producto":
      buscarProductos(termino, res);
      break;
    case "categoria":
      buscarCategorias(termino, res);
      break;

    case "usuario":
      buscarUsuarios(termino, res);
      break;

    default:
      res.json({
        coleccion,
        termino,
      });
      break;
  }
};

module.exports = {
  buscarController,
};
