const usuariosModel = require("../models/usuariosModel");

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.listarUsuarios();

        res.status(200).json(usuarios);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };
        
        const usuario = await usuariosModel.buscarIdUsuario(id);
        
        if(!usuario){
            return res.status(404).json({
                mensagem:"Id inválido, o id deve ser um número inteiro."
            });
        };
        
        res.status(200).json(usuario);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarUsuario = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarUsuario = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarUsuario = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarUsuarios,
    buscarIdUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
};