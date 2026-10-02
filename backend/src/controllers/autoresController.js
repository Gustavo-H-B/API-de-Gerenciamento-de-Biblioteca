const autoresModel = require("../models/autoresModel");

const listarAutores = async (req, res) => {
    try {
        const autores = await autoresModel.listarAutores();

        res.status(200).json(autores);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdAutor = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const autor = await autoresModel.buscarIdAutor(id);

        if(!autor){
            return res.status(404).json({
                mensagem: "Autor não encontrado."
            });
        };

        res.status(200).json(autor);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarAutor = async (req, res) => {
    try {
        const {nome_completo, nacionalidade, data_nascimento} = req.body;

        if(!nome_completo || nome_completo.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome completo é obrigatório e não pode ficar vazio."
            });
        };

        if(nome_completo.length > 150){
            return res.status(400).json({
                mensagem: "O nome completo não pode exceder 150 caracteres."
            });
        };

        if(!nacionalidade || nacionalidade.trim() === 0){
            return res.status(400).json({
                mensagem: "A nacionalidade é obrigatório e não pode ficar vazio."
            });
        };

        if(nacionalidade.length > 80){
            return res.status(400).json({
                mensagem: "A nacionalidade não pode exceder 80 caracteres."
            });
        };

        if (!data_nascimento || data_nascimento.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de nascimento é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        const novoAutor = await autoresModel.cadastrarAutor(nome_completo, nacionalidade, data_nascimento);

        res.status(201).json(novoAutor);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarAutor = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const {nome_completo, nacionalidade, data_nascimento} = req.body;

        if(!nome_completo || nome_completo.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome completo é obrigatório e não pode ficar vazio."
            });
        };

        if(nome_completo.length > 150){
            return res.status(400).json({
                mensagem: "O nome completo não pode exceder 150 caracteres."
            });
        };

        if(!nacionalidade || nacionalidade.trim() === 0){
            return res.status(400).json({
                mensagem: "A nacionalidade é obrigatório e não pode ficar vazio."
            });
        };

        if(nacionalidade.length > 80){
            return res.status(400).json({
                mensagem: "A nacionalidade não pode exceder 80 caracteres."
            });
        };

        if (!data_nascimento || data_nascimento.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de nascimento é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        const autor = await autoresModel.buscarIdAutor(id);

        if(!autor){
            return res.status(404).json({
                mensagem: "Autor não encontrado."
            });
        };

        const autorAtualizado = await autoresModel.atualizarAutor(id, nome_completo, nacionalidade, data_nascimento);

        res.status(200).json({
            mensagem:"Cadastro do autor atualizado.",
            autor: autorAtualizado
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarAutor = async (req, res) => {
    try {
        const id = req.params.id;

        if(!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            })
        };

        const autor = await autoresModel.buscarIdAutor(id);

        if(!autor){
            return res.status(404).json({
                mensagem: "Autor não encontrado."
            });
        };

        await autoresModel.deletarAutor(id);

        res.status(200).json({
            mensagem: `O autor do id: ${id} foi deletado com sucesso.`
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarAutores,
    buscarIdAutor,
    cadastrarAutor,
    atualizarAutor,
    deletarAutor
};