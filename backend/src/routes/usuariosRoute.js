const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/usuarios", usuariosController.listarUsuarios);
router.get("/usuarios/:id", usuariosController.buscarIdUsuario);
router.post("/usuarios", usuariosController.cadastrarUsuario);
router.put("/usuarios/:id", usuariosController.atualizarUsuario);
router.delete("/usuarios/:id", usuariosController.deletarUsuario);

module.exports = router;