const express = require("express");
const router = express.Router();
const { userPost, userDelete } = require("../controllers/userControllers");
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { emailExiste } = require("../helpers/emailExiste");
const { validarJWT } = require("../middlewares/validar-jwt");
const { existeUsuarioId } = require("../helpers/existeUsuarioId");

// Ruta para crear un nuevo usuario
router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("contrasena").notEmpty().withMessage("La contraseña es requerida"),
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe tener un formato válido"),
    body('email').custom(emailExiste),
    validarCampos
  ],
  userPost
);



router.delete('/:id',[
  validarJWT,
  check('id','Ingrese una ID de mongo valida').isMongoId(),
  check('id').custom(existeUsuarioId),
  validarCampos
],userDelete)

module.exports = router;
