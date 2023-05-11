const express = require("express");
const { buscarController } = require("../controllers/buscarController");
const searchRouter = express.Router();



searchRouter.get('/:coleccion/:termino',[],buscarController);








module.exports = {
    searchRouter
}