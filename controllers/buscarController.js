const { request, response } = require("express");
const { default: mongoose } = require("mongoose");
const Usuario = require("../models/user");

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

const buscarController = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "producto":
      break;
    case "categoria":
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
