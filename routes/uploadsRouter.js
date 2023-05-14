const express = require("express");
const uploadsRouter = express.Router();
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { cargarArchivo } = require("../controllers/uploadsController");



uploadsRouter.post('/',[],cargarArchivo);




module.exports = {
    uploadsRouter
}