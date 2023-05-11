const express = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const {
  crearCategoria,
  obtenerCategorias,
  eliminarCategoria,
  obtenerCategoria,
  actualizarCategoria,
} = require("../controllers/categoriasController");
const { existeCategoriaId } = require("../helpers/db-validators");
const categoriasRouter = express.Router();

categoriasRouter.get(
  "/:id",
  [
    check("id").isMongoId().withMessage("No es un mongo ID valido"),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  obtenerCategoria
);

categoriasRouter.get("/", obtenerCategorias);

categoriasRouter.post(
  "/",
  [
    validarJWT,
    body("nombre").notEmpty().withMessage("Error el nombre es obligatorio"),
    validarCampos,
  ],
  crearCategoria
);

categoriasRouter.put(
  "/:id",
  [
    validarJWT,
    check("id").isMongoId().withMessage("No es un mongo ID valido"),
    check("id").custom(existeCategoriaId),
    body('nombre').notEmpty().withMessage('Nombre es necesario para actualizacion'),
    validarCampos,
    
  ],
  actualizarCategoria
);

//Ruta protegida solo administrador puede borrar categorias
categoriasRouter.delete(
  "/:id",
  [
    validarJWT,
    check("id").isMongoId().withMessage("No es un mongo ID valido"),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = {
  categoriasRouter,
};
