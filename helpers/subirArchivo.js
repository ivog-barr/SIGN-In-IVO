const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (file, extensiones = ['png','jpg','jpeg','gif','webp'] , carpeta = '' ) => {

    return new Promise ((resolve,reject)=>{
      console.log(file);
      console.log(extensiones);

        const {name} = file;
        const nombreCortado = name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1 ];

        if(!extensiones.includes(extension)){
           return reject(`Extension ${extension} no permitida. Solo ${extensiones}`);
        };
    
        const nombreTemporal = uuidv4() +'.' + extension;
        const uploadPath = path.join(__dirname,'../uploads/',carpeta, nombreTemporal);
      
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
      
          if (err) {
            console.log(err.message);
            return res.status(500).send(err);
          };
      
           resolve(nombreTemporal);
        });

    })

   

}

module.exports ={
    subirArchivo
}