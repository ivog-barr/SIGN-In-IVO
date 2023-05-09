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
  
      res.status(201).json({ 
        mensaje: 'Usuario creado exitosamente',
        usuario
     });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  };



  const userDelete = async(req = request, res= response)=>{
    const {id} = req.params;

    if(!req.authUser.estado){
      return res.status(401).json({
        msg:'Usuario eliminado de la base de datos no puede realizar esta accion'
      })
    }

    try {
      const user  = await Usuario.findByIdAndUpdate(id,{estado:false},{new:true});

      res.json({
        msg:'Usuario eliminado satisfactoriamente',
        user

      })
      
    } catch (error) {
      
    }
  }



  module.exports = {
    userPost,
    userDelete
  }