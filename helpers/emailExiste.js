const Usuario = require("../models/user");




const emailExiste = async(email ="")=> {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
         throw new Error('Email ya existe en la BDD');
    }

}


module.exports = {
    emailExiste
}