const { request, response } = require("express");
const Producto = require("../models/producto");
const { Categoria } = require("../models/categoria");

const productGet = async (req = request, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),

    Producto.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario", "nombre")
      .populate('categoria','nombre')
  ]);

  res.json({
    total,
    productos,
  });
};

const productSingleGet = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate("usuario", "nombre").populate('descripcion','nombre');

  res.json({
    producto,
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
  const { id } = req.params;
  const { estado, usuario, ...resto } = req.body;

  if (resto.nombre) {
    resto.nombre = resto.nombre.toUpperCase();
  };

  if (resto.precio && isNaN(Number(resto.precio))) {
    console.log(resto.precio);
    return res.json({
      msg: "Por favor ingrese caracteres validos (numeros)",
    });
  };

  if (resto.categoria) {
    try {
      const existeCategoria = await Categoria.findById(resto.categoria);

      // Verificar si no existe la categoría en la base de datos
      if (!existeCategoria) {
        return res.status(404).json({ error: "No existe categoría con ese ID" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Error al buscar la categoría" });
    }
  }

  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    producto,
  });
};

const productDelete = async (req = request, res = response) => {
  const { id } = req.params;

  if (!req.authUser.estado) {
    return res.status(401).json({
      msg: "Usuario eliminado de la base de datos no puede realizar esta accion",
    });
  }

  if (req.authUser.rol !== "Admin") {
    return res.status(401).json({
      msg: "Usuario no es administrador , no puede realizar esta accion",
    });
  }

  const product = await Producto.findByIdAndUpdate(
    id,
    { estado: false, disponible: false },
    { new: true }
  );
  res.json({
    msg: `Producto con el id de ${id} ha sido eliminado satisfactoriamente`,
    product,
  });
};

module.exports = {
  productGet,
  productDelete,
  productPost,
  productPut,
  productSingleGet
};
