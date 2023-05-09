const express = require("express");
const authRouter = express.Router();
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { authController, googleController } = require("../controllers/authController");


authRouter.post('/',[

    body("contrasena").notEmpty().withMessage("La contraseña es requerida"),
    body("email").isEmail().withMessage('Formato de correo incorrecto'),
    validarCampos

],authController);


authRouter.post('/google',[

    check('id_token','Token de google es necesario').notEmpty(),
    validarCampos

],googleController);



module.exports = {
    authRouter
}