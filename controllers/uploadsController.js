const { response, request } = require("express");
const path = require("path");

const { subirArchivo } = require("../helpers/subirArchivo");

const cargarArchivo = async (req = request, res = response) => {
  const {archivo} = req.files;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).send("No files were uploaded.");
  };


  const extensionesValidas = ['txt'];

  try {
    const respArchivo =  await subirArchivo(archivo,extensionesValidas,'textos');

    res.json({
      respArchivo
    });
    
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error
    });
    
  }
  

  

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

};

module.exports = {
  cargarArchivo,
};
