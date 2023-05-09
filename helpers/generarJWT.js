const jwt = require('jsonwebtoken');


const generarJWT = async (uid = '')=>{
    const payload ={ uid };

    try {
        const token = await  jwt.sign(payload, process.env.SECRETKEY,{
            expiresIn:'4h'
        });

        return token
    } catch (error) {
        console.log(err);
        throw new Error ('No se pudo generar el token');
        
    }
};

module.exports ={
    generarJWT
}