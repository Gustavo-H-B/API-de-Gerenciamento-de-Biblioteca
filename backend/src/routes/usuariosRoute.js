const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.buscarIdUsuario);
router.post("/", usuariosController.cadastrarUsuario);
router.put("/:id", usuariosController.atualizarUsuario);
router.delete("/:id", usuariosController.deletarUsuario);

module.exports = router;