const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/autores", autoresController.listarAutores);
router.get("/autores/:id", autoresController.buscarIdAutor);
router.post("/autores", autoresController.cadastrarAutor);
router.put("/autores/:id", autoresController.atualizarAutor);
router.delete("/autores/:id", autoresController.deletarAutor);

module.exports = router;