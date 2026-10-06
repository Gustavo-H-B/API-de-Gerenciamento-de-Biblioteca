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

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const livro = await livrosModel.buscarIdLivro(id);

        if (!livro){
            return res.status(404).json({
                mensagem:"Livro não encontrado."
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

        if (!titulo || titulo.trim() === 0){
            return res.status(400).json({
                mensagem: "O titulo é obrigatório e não pode ficar vazio."
            });
        };

        if (titulo.length > 200){
            return res.status(400).json({
                mensagem: "O titulo não pode exceder 150 caracteres."
            });
        };

        if (!isbn || isbn.trim() === 0){
            return res.status(400).json({
                mensagem: "O isbn é obrigatório e não pode ficar vazio."
            });
        };

        if (isbn.length > 20){
            return res.status(400).json({
                mensagem: "O isbn não pode exceder 20 caracteres."
            });
        };

        if (!/^-?\d+$/.test(ano_publicado) || ano_publicado < -32768 || ano_publicado > 32768) {
            return res.status(400).json({
                mensagem: "O ano de publicação inválido, tem que ser um valor inteiro entre -32768 até 32768." });
        };

        if (!/^\d+$/.test(numero_paginas) || numero_paginas > 2147483647) {
            return res.status(400).json({
                mensagem: "Número de paginas inválido, tem quer um número inteiro até 2147483647"
            });
        };

        if (sinopse && sinopse.length > 65535){
            return res.status(400).json({
                mensagem: "A sinopse não pode exceder 65.535 caracteres."
            });
        };

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
        const id = req.params.id;

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const livro = await livrosModel.buscarIdLivro(id);

        if (!livro){
            return res.status(404).json({
                mensagem: "Livro não encontrado."
            });
        };

        const {titulo, isbn, ano_publicado, numero_paginas, sinopse} = req.body;

        if (!titulo || titulo.trim() === 0){
            return res.status(400).json({
                mensagem: "O titulo é obrigatório e não pode ficar vazio."
            });
        };

        if (titulo.length > 200){
            return res.status(400).json({
                mensagem: "O titulo não pode exceder 200 caracteres."
            });
        };

        if (!isbn || isbn.trim() === 0){
            return res.status(400).json({
                mensagem: "O isbn é obrigatório e não pode ficar vazio."
            });
        };

        if (isbn.length > 20){
            return res.status(400).json({
                mensagem: "O isbn não pode exceder 20 caracteres."
            });
        };

        if (!/^-?\d+$/.test(ano_publicado) || ano_publicado < -32768 || ano_publicado > 32768) {
            return res.status(400).json({
                mensagem: "O ano de publicação inválido, tem que ser um valor inteiro entre -32768 até 32768." });
        };

        if (!/^\d+$/.test(numero_paginas) || numero_paginas > 2147483647) {
            return res.status(400).json({
                mensagem: "Número de paginas inválido, tem quer um número inteiro até 2147483647"
            });
        };

        if (sinopse && sinopse.length > 65535){
            return res.status(400).json({
                mensagem: "A sinopse não pode exceder 65.535 caracteres."
            });
        };

        const livroAtualizado = await livrosModel.atualizarLivro(id, titulo, isbn, ano_publicado, numero_paginas, sinopse);

        res.status(200).json({
            mensagem: "Cadastro do livro atualizado.",
            livro:  livroAtualizado
        });

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

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const livro = await livrosModel.buscarIdLivro(id);

        if (!livro){
            return res.status(404).json({
                mensagem:"Livro não encontrado."
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