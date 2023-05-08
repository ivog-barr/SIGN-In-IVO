const express = require("express");
const authRouter = express.Router();
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { authController } = require("../controllers/authController");


authRouter.post('/',[

    body("contrasena").notEmpty().withMessage("La contraseña es requerida"),
    body("email").isEmail().withMessage('Formato de correo incorrecto'),
    validarCampos

],authController);



module.exports = {
    authRouter
}