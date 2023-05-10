const { request, response } = require("express");
const Usuario = require("../models/user");
const bcrypt = require('bcrypt');


const userGet = async(req = request,res = response)=>{
  const {desde=0, limit=5 } = req.query;

  const [total,usuarios] = await Promise.all([
      Usuario.countDocuments({estado:true}),

      Usuario.find({estado:true})
          .skip(Number(desde))
          .limit(Number(limit))

     
      
  ]);
  res.json({
      total,
      usuarios
  });
};



const userPost = async (req =request, res = response) => {
    try {
      const { nombre, contrasena, email, rol="User" } = req.body;
  
      // Crear una instancia del modelo Usuario con los datos recibidos
      const usuario = new Usuario({
        nombre,
        contrasena,
        email,
        rol
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


  const userPut = async(req =request, res = response)=>{
    const{id} = req.params;

    const{_id, contrasena,estado,email,rol,google, ...resto} = req.body;

    console.log(req.authUser); 


    if(req.authUser.google && email){
      return res.json({
        msg:'No se puede actualizar correo si se registro con google'
      });
    }

    resto.email = email;


    if(contrasena){
      const salt = bcrypt.genSaltSync();
      resto.contrasena = bcrypt.hashSync(contrasena,salt);
    }

    const user = await Usuario.findByIdAndUpdate(id,resto,{new:true});
    await user.save();

    res.json({
      msg:'Usuario actualizado con exito :)',
      user
    })
  }



  const userDelete = async(req = request, res= response)=>{
    const {id} = req.params;

    if(!req.authUser.estado){
      return res.status(401).json({
        msg:'Usuario eliminado de la base de datos no puede realizar esta accion'
      });
    };

    if(req.authUser.rol !== "Admin"){
      return res.status(401).json({
        msg:'Usuario no es administrador , no puede realizar esta accion'
      });

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
    userDelete,
    userPut,
    userGet
  }