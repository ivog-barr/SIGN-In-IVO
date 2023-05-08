const { request, response } = require("express");



const authController =(req = request, res= response)=>{
    const {email,contrasena} = req.body;

    res.json({
        email,
        contrasena
    })

};


module.exports = {
    authController
}