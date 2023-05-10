const { request, response } = require("express");
const { Categoria } = require("../models/categoria");

const obtenerCategorias = async (req = request, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const [total, categoria] = await Promise.all([
    Categoria.countDocuments({ estado: true }),

    Categoria.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario", "nombre"),
  ]);

  res.json({
    total,
    categoria,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json({
    categoria,
  });
};
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
 
  const {usuario,estado, ...data} = req.body;
  data.nombre = data.nombre.toUpperCase();

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { nombre:data.nombre },
    { new: true }
  ).populate("usuario", "nombre");

  res.json({
    msg: `Categoria con id ${id} modificada exitosamente`,
    categoria,
  });
};

const eliminarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const user = req.authUser;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  if (user.rol !== "Admin") {
    return res.status(401).json({
      msg: "Usuario no es administrador , no puede realizar esta accion",
    });
  }

  res.json({
    msg: "Categoria eliminada satisfactoriamente",
    categoria,
    User: `Eliminada por ${user.nombre} con el id de ${user._id}`,
  });
};

//Crear una nueva categoria!!!!
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe.`,
    });
  }
  const data = {
    nombre,
    usuario: req.authUser._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(200).json({
    categoria,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  eliminarCategoria,
  actualizarCategoria,
};
