const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosController");

router.get("/generos", generosController.listarGeneros);
router.get("/generos/:id", generosController.buscarIdGenero);
router.post("/generos", generosController.cadastrarGenero);
router.put("/generos/:id", generosController.atualizarGenero);
router.delete("/generos/:id", generosController.deletarGenero);

module.exports = router;