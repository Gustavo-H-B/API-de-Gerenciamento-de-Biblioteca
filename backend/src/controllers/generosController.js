const generosModel = require("../models/generosModel");

const listarGeneros = async (req, res) => {
    try {
        const generos = await generosModel.listarGeneros();

        res.status(200).json(generos);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdGenero = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };
        
        const genero = await generosModel.buscarIdGenero(id);

        if(!genero){
            return res.status(404).json({
                mensagem:"Id inválido, o id deve ser um número inteiro."
            });
        };
        
        res.status(200).json(genero);

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