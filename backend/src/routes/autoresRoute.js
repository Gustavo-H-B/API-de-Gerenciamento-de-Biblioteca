const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/", autoresController.listarAutores);
router.get("/:id", autoresController.buscarIdAutor);
router.post("/", autoresController.cadastrarAutor);
router.put("/:id", autoresController.atualizarAutor);
router.delete("/:id", autoresController.deletarAutor);

module.exports = router;