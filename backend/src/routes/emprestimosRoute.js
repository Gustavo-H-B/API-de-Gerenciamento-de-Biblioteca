const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

router.get("/emprestimos", emprestimosController.listarEmprestimos);
router.get("/emprestimos/:id", emprestimosController.buscarIdEmprestimo);
router.post("/emprestimos", emprestimosController.cadastrarEmprestimo);
router.put("/emprestimos/:id", emprestimosController.atualizarEmprestimo);
router.delete("/emprestimos/:id", emprestimosController.deletarEmprestimo);

module.exports = router;