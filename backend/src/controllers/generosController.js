const generosModel = require("../models/generosModel");

const listarGeneros = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdGenero = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarGenero = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarGenero = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarGenero = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarGeneros,
    buscarIdGenero,
    cadastrarGenero,
    atualizarGenero,
    deletarGenero
};