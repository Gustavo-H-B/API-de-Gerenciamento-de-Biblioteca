const livrosModel = require("../models/livrosModel");

const listarLivros = async (req, res) => {
    try {
        const livros = await livrosModel.listarLivros();

        res.status(200).json(livros);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdLivro = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const livro = await livrosModel.buscarIdLivro(id);

        if(!livro){
            return res.status(404).json({
                mensagem:"Id inválido, o id deve ser um número inteiro."
            });
        };

        res.status(200).json(livro);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarLivro = async (req, res) => {
    try {
        const {titulo, isbn, ano_publicado, numero_paginas, sinopse} = req.body;


        const novoLivro = await livrosModel.cadastrarLivro(titulo, isbn, ano_publicado, numero_paginas, sinopse);

        res.status(201).json(novoLivro);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarLivro = async (req, res) => {
    try {

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarLivro = async (req, res) => {
    try {
        const id = await req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const livro = await livrosModel.buscarIdLivro(id);

        if(!livro){
            return res.status(404).json({
                mensagem:"Id inválido, o id deve ser um número inteiro."
            });
        };

        await livrosModel.deletarLivro(id);

        res.status(200).json({
            mensagem: `O livro do id: ${id} foi deletado com sucesso.`
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarLivros,
    buscarIdLivro,
    cadastrarLivro,
    atualizarLivro,
    deletarLivro
};