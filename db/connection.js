const mongoose  = require('mongoose');



const conectarDB = async()=>{
    try {

        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Conectado exitosamente a la BDD SploinkDB');
    } catch (error) {
        console.log(error);
        console.log('No se pudo conectar a la BDD');
        
    };
}





module.exports = {
    conectarDB
}