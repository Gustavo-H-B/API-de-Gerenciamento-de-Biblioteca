const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController");

router.get("/livros", livrosController.listarLivros);
router.get("/livros/:id", livrosController.buscarIdLivro);
router.post("/livros", livrosController.cadastrarLivro);
router.put("/livros/:id", livrosController.atualizarLivro);
router.delete("/livros/:id", livrosController.deletarLivro);

module.exports = router;