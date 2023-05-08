const { request, response } = require("express");
const Usuario = require("../models/user");
const bcrypt = require('bcrypt');


const userPost = async (req =request, res = response) => {
    try {
      const { nombre, contrasena, email } = req.body;
  
      // Crear una instancia del modelo Usuario con los datos recibidos
      const usuario = new Usuario({
        nombre,
        contrasena,
        email
      });

      const salt = bcrypt.genSaltSync();
      usuario.contrasena = bcrypt.hashSync(contrasena,salt);
  
      // Guardar el usuario en la base de datos
      await usuario.save();
  
      res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  };



  module.exports = {
    userPost
  }