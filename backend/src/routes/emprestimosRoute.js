const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

router.get("/", emprestimosController.listarEmprestimos);
router.get("/:id", emprestimosController.buscarIdEmprestimo);
router.post("/", emprestimosController.cadastrarEmprestimo);
router.put("/:id", emprestimosController.atualizarEmprestimo);
router.delete("/:id", emprestimosController.deletarEmprestimo);

module.exports = router;