const Usuario = require("../models/user");
const mongoose = require('mongoose');



const existeUsuarioId = async(id)=> {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
         throw new Error(`El usuario con el id ${id} no existe`);
    }

}


module.exports = {
    existeUsuarioId
}