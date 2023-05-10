const { request, response } = require("express");

const authorizationMiddleware = (req =request, res = response, next) => {
    const { id } = req.params;
    const { authUser } = req;
    console.log(authUser._id + ' //// ' + id);

    const id1 = authUser._id.toString();
    const id2 = id.toString()
    // Verificar si el ID del usuario en el token coincide con el ID proporcionado en los parámetros
    if (id1 !== id2) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este usuario' });
    }
  
    // Si la autorización es exitosa, continuar con el siguiente middleware
    next();
  };
  
  module.exports = {authorizationMiddleware};