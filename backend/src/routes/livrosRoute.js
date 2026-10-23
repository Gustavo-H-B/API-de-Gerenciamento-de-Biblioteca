const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController");

router.get("/", livrosController.listarLivros);
router.get("/:id", livrosController.buscarIdLivro);
router.post("/", livrosController.cadastrarLivro);
router.put("/:id", livrosController.atualizarLivro);
router.delete("/:id", livrosController.deletarLivro);

module.exports = router;