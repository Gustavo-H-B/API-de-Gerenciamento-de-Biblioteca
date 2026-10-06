const emprestimosModel = require("../models/emprestimosModel");
const livrosModel = require("../models/livrosModel");
const usuariosModel = require("../models/usuariosModel");

const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimosModel.listarEmprestimos();

        res.status(200).json(emprestimos);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const buscarIdEmprestimo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const emprestimo = await emprestimosModel.buscarIdEmprestimo(id);

        if (!emprestimo){
            return res.status(404).json({
                mensagem:"Empréstimo não encontrado."
            });
        };
        
        res.status(200).json(emprestimo);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const cadastrarEmprestimo = async (req, res) => {
    try {
        const {data_emprestimo, data_devolucao, id_livro, id_usuario} = req.body;

        if (!data_emprestimo || data_emprestimo.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de empréstimo é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_emprestimo)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        if (!data_devolucao || data_devolucao.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de devolução é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_devolucao)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        if (!/^\d+$/.test(id_livro)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        id_livro = await livrosModel.buscarIdLivro(id);

        if (!id_livro){
            return res.status(404).json({
                mensagem:"O id do livro não encontrado."
            });
        };

        if (!/^\d+$/.test(id_usuario)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        id_usuario = await usuariosModel.buscarIdUsuario(id);

        if (!id_usuario){
            return res.status(404).json({
                mensagem:"O id do usuario não encontrado."
            });
        };

        const novoEmprestimo = await emprestimosModel.cadastrarEmprestimo(data_emprestimo, data_devolucao, id_livro, id_usuario);

        return res.status(201).json(novoEmprestimo);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const atualizarEmprestimo = async (req, res) => {
    try {
        const id = await req.params.id;
    
        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const emprestimo = await emprestimosModel.buscarIdEmprestimo(id);

        if (!emprestimo){
            return res.status(404).json({
                mensagem:"emprestimo não encontrado."
            });
        };

        const {data_emprestimo, data_devolucao, id_livro, id_usuario} = req.body;

        if (!data_emprestimo || data_emprestimo.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de empréstimo é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_emprestimo)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        if (!data_devolucao || data_devolucao.trim().length === 0) {
            return res.status(400).json({ mensagem: "A data de devolução é obrigatória." });
        };

        if (!/^\d{4}-\d{2}-\d{2}$/.test(data_devolucao)) {
            return res.status(400).json({ mensagem: "Formato de data inválido. Use AAAA-MM-DD." });
        };

        if (!/^\d+$/.test(id_livro)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        id_livro = await livrosModel.buscarIdLivro(id);

        if (!id_livro){
            return res.status(404).json({
                mensagem:"O id do livro não encontrado."
            });
        };

        if (!/^\d+$/.test(id_usuario)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        id_usuario = await usuariosModel.buscarIdUsuario(id);

        if (!id_usuario){
            return res.status(404).json({
                mensagem:"O id do usuario não encontrado."
            });
        };

        const emprestimoAtualizado = await emprestimosModel.atualizarEmprestimo(data_emprestimo, data_devolucao, id_livro, id_usuario);

        return res.status(200).json({
            mensagem: "Cadastro do empréstimo atualizado.",
            emprestimo: emprestimoAtualizado
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

const deletarEmprestimo = async (req, res) => {
    try {
        const id = await req.params.id;
    
        if (!/^\d+$/.test(id)){
            return res.status(400).json({
                mensagem: "Id inválido, o id deve ser um número inteiro."
            });
        };

        const emprestimo = await emprestimosModel.buscarIdEmprestimo(id);

        if (!emprestimo){
            return res.status(404).json({
                mensagem:"Empréstimo não encontrado."
            });
        };

        await emprestimosModel.deletarEmprestimo(id);

        res.status(200).json({
            mensagem: `O emprestimo do id: ${id} foi deletado com sucesso.`
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor."
        });
    };
};

module.exports = {
    listarEmprestimos,
    buscarIdEmprestimo,
    cadastrarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo
};