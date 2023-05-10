const { request, response } = require('express');
const validator = require('validator');

const emailValidator = (req = request, res = response, next) => {
    const { email } = req.body;
  
    // Verificar si el correo está presente pero no es válido
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: 'El correo proporcionado no es válido' });
    }
  
    // Si el correo es válido o no está presente, continuar con el siguiente middleware
    next();
  };



  module.exports = {
    emailValidator
  }