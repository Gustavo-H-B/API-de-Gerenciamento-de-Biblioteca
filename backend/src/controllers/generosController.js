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
                mensagem:"Gênero não encontrado."
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
        const {nome} = req.body;

        if (!nome || nome.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome do genero é obrigatório e não pode ficar vazio."
            });
        };

        if (nome.length > 80){
            return res.status(400).json({
                mensagem: "O nome do genero não pode exceder 80 caracteres."
            });
        };

        const novoGenero = await generosModel.cadastrarGenero(nome);

        res.status(201).json(novoGenero);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarGenero = async (req, res) => {
    try {
        const id = req.params.id;  
        
        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };
        
        const genero = await generosModel.buscarIdGenero(id);

        if (!genero){
            return res.status(404).json({
                mensagem: "Gênero não encontrado."
            });
        };

        const {nome} = req.body;

        if (!nome || nome.trim() === 0){
            return res.status(400).json({
                mensagem: "O nome do gênero é obrigatório e não pode ficar vazio."
            });
        };

        if (nome.length > 80){
            return res.status(400).json({
                mensagem: "O nome do gênero não pode exceder 80 caracteres."
            });
        };

        const generoAtualizado = await generosModel.atualizarGenero(nome);

        return res.status(200).json({
            mensagem: "Cadastro do gênero atualizado.",
            genero: generoAtualizado
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarGenero = async (req, res) => {
    try {
        const id = await req.params.id;
        
        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const genero = await generosModel.deletarGenero(id);

        if (!genero){
            return res.status(404).json({
                mensagem:"Gênero não encontrado."
            });
        };

        await generosModel.deletarGenero(id);

        res.status(200).json({
            mensagem: `O gênero do id: ${id} foi deletado com sucesso.`
        });

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