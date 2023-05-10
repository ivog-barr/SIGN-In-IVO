const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');



const validarJWT = async(req=request, res= response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    };

    try {
        const {uid} = await jwt.verify(token, process.env.SECRETKEY);
        const authUser = await Usuario.findById(uid);
        req.authUser = authUser;

        next();

        
    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            msg:"Ocurrio un error en la validacion del token"
        })
        
    }

   
};


module.exports = {
    validarJWT
}