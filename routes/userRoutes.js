const express = require("express");
const router = express.Router();
const {
  userPost,
  userDelete,
  userPut,
  userGet,
} = require("../controllers/userControllers");
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const { validarJWT } = require("../middlewares/validar-jwt");

const { emailExiste, existeUsuarioId } = require("../helpers/db-validators");
const { emailValidator } = require("../middlewares/validarCorreo");
const { authorizationMiddleware } = require("../middlewares/isUserAuth");
// Ruta para crear un nuevo usuario

router.get('/',userGet)


router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("contrasena").isLength({ min: 6 }).withMessage("Minimo 6 letras"),
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe tener un formato válido"),
    body("email").custom(emailExiste),
    body("rol")
      .isIn(["User", "Admin", "Sales"])
      .withMessage("Rol incorrecto, ingrese uno correcto"),
    validarCampos,
  ],
  userPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un mongo ID Valido").trim().isMongoId(),
    check("id").custom(existeUsuarioId),
    body("email").custom(emailExiste),
    validarCampos,
    emailValidator,
    authorizationMiddleware,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "Ingrese una ID de mongo valida").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
