const { Categoria } = require("../models/categoria");
const Producto = require("../models/producto");
const Usuario = require("../models/user");



const emailExiste = async(email ="")=> {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
         throw new Error('Email ya existe en la BDD');
    }

};

const existeUsuarioId = async(id)=> {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
         throw new Error(`El usuario con el id ${id} no existe`);
    };



};

const existeCategoriaId =async(id)=>{
    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
        throw new Error(`Categoria con el id de ${id} no existe`);
    }
};


const existeProductoId = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`Categoria con el id de ${id}, no existe`);
    }

};








module.exports = {
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId,
    
}