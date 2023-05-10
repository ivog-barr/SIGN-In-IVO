const express = require("express");
const { productGet, productPost, productPut, productDelete } = require("../controllers/productosController");
const { body, check } = require("express-validator");
const { existeCategoriaId, existeProductoId } = require("../helpers/db-validators");
const productRouter = express.Router();
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");

//Obtener todos los productos --ruta public
productRouter.get('/',productGet);


//Obtener producto por id -- ruta publica
productRouter.get('/:id',productGet);

//Crear un producto
productRouter.post('/',[
    validarJWT,
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('categoria').custom(existeCategoriaId),
    body('descripcion').notEmpty().withMessage('La descripcion no puede estar vacia'),
    validarCampos

],productPost);

//Actualizar un producto
productRouter.put('/',productPut);

//Eliminar un producto solo administrador
productRouter.delete('/:id',[
    validarJWT,
    check('id').isMongoId().withMessage('no es un id de mongo valido'),
    check('id').custom(existeProductoId),
    validarCampos,


],productDelete);



module.exports = {
    productRouter
}