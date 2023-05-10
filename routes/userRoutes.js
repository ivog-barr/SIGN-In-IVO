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
    check("id", "No es un mongo ID Valido").isMongoId(),
    check("id").custom(existeUsuarioId),
    check("email", "El correo no es valido").isEmail(),
    body("rol")
      .isIn(["User", "Admin", "Sales"]),
    validarCampos
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
