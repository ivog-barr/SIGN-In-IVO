const express = require("express");
const router = express.Router();
const { userPost } = require("../controllers/userControllers");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { emailExiste } = require("../helpers/emailExiste");

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

module.exports = router;
