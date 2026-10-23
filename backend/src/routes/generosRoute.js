const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosController");

router.get("/", generosController.listarGeneros);
router.get("/:id", generosController.buscarIdGenero);
router.post("/", generosController.cadastrarGenero);
router.put("/:id", generosController.atualizarGenero);
router.delete("/:id", generosController.deletarGenero);

module.exports = router;