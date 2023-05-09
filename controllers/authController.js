const { request, response } = require("express");
const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const authController = async (req = request, res = response) => {
  const { email, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / contrasena incorrectos , USUARIO",
      });
    }
    const pwdValid = bcrypt.compareSync(contrasena, user.contrasena);

    if (!pwdValid) {
      return res.status(400).json({
        msg: "Usuario / contrasena incorrectos , CONTRASENA",
      });
    }

    const token = await generarJWT(user.id);

    res.json({
      msg: "Usuario logeado exitosamente uwuwuwuwuuwuwuwuwuw",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleController = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);

    if (!usuario) {
      const data = {
        nombre: name,
        img: picture,
        email,
        contrasena: ":P",
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario desactivado hable con el administrador :)",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });


  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      msg: "El token no se pudo validar correctamente",
    });
  }
};

module.exports = {
  authController,
  googleController,
};
